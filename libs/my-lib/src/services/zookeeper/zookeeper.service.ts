import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import * as zookeeper from 'node-zookeeper-client';

@Injectable()
export class ZookeeperService implements OnModuleInit, OnModuleDestroy {
  private client: zookeeper.Client;

  onModuleInit() {
    this.client = zookeeper.createClient('localhost:2181', {
      sessionTimeout: 5000,
    });
    this.client.once('state', () =>
      console.log('[zookeeper] Client Connected'),
    );
    this.client.connect();
  }

  onModuleDestroy() {
    this.client.close();
  }

  async has(path: string, createIfNotExist: boolean = false): Promise<boolean> {
    const hasPath = await new Promise((resolve) => {
      this.client.exists(path, (_err, stat) => resolve(!!stat));
    });
    return new Promise((resolve) => {
      if (!hasPath && createIfNotExist) {
        this.client.create(
          path,
          zookeeper.CreateMode.PERSISTENT,
          (err, path) => {
            if (err) resolve(false);

            console.log(`created succ: ${path}`);
            resolve(true);
          },
        );
      }
      resolve(true);
    });
  }

  async generateKey(path: string, data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.create(
        path,
        Buffer.from(data),
        zookeeper.CreateMode.EPHEMERAL_SEQUENTIAL,
        (error, path) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(path);
        },
      );
    });
  }
}
