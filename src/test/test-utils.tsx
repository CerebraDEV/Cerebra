import React from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet } from '@wagmi/chains';

// 创建一个简单的测试配置
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: () => null as any,
  },
});

// 测试包装器组件
export function TestWrapper({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
} 