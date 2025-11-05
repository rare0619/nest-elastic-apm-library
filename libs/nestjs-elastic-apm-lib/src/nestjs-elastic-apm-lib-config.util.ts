import apm, { Agent, AgentConfigOptions } from 'elastic-apm-node';

/**
 * 安全更新 APM Agent 配置字段。
 * 可在 agent 已启动后调用，用于同步 Nest register() 的配置。
 * 不会报 ESLint 错，也不依赖宿主工程。
 */
export function updateApmConfig(
  updates: Partial<AgentConfigOptions>,
  agent?: Agent,
): void {
  const target = agent ?? apm;
  if (!target || typeof target !== 'object') return;

  // agent.config 是内部字段，这里显式定义类型
  const internal = target as unknown as { config?: Record<string, unknown> };
  if (!internal.config) return;

  for (const [key, value] of Object.entries(updates)) {
    try {
      internal.config[key] = value;
    } catch {
      // 忽略私有字段写入错误
    }
  }
}
