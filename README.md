# sunzi-skills ·《孙子兵法》谋略技能包

将《孙子兵法》十三篇蒸馏为 **3 个可复用的 WorkBuddy 技能（Skill）**，覆盖「事前庙算 → 临阵应变 → 将道情报」的完整决策链路。

## 技能清单

| 技能 | 定位 | 核心能力 |
|------|------|----------|
| [`sunzi-strategy`](./sunzi-strategy/) | 谋略预判 · 全胜 | 五事七计庙算、全胜梯度、兵力对比、上兵伐谋、知彼知己 |
| [`sunzi-adapt`](./sunzi-adapt/) | 虚实应变 · 任势 | 先为不可胜、奇正相生、避实击虚、以迂为直、因敌制胜 |
| [`sunzi-command`](./sunzi-command/) | 将道 · 地形 · 情报 | 九变通权、相敌 32 态、六地形、九地、火攻慎战、用间 |

## 安装

将 `sunzi-strategy/`、`sunzi-adapt/`、`sunzi-command/` 三个文件夹整体复制到 WorkBuddy 技能目录：

- **用户级**（对所有项目生效）：`~/.workbuddy/skills/`
- **项目级**（仅当前项目）：`<项目根>/.workbuddy/skills/`

每个技能目录内含：

- `SKILL.md` —— 元信息、触发词与调用规则（WorkBuddy 自动加载）
- `README.md` —— 详细用法、决策框架与示例

## 来源与工艺

蒸馏自《孙子兵法》（维基文库十三篇原文），经「一盏神灯」技能完成：

1. 切块与全局骨架抽取
2. 框架 / 原则 / 案例 / 反例 / 术语 五路并行提取
3. 三重验证（框架 + 原则主料）与自动纠偏
4. 元信息闸门 + 盲测双层诱饵测试（12/12 通过）

## 许可

[MIT License](./LICENSE) — Copyright (c) 2026 Dillon-Xue
