# SlimFit技术方案
一、背景
1.1 业务背景
- 现状痛点:
  - UI 老旧: 系统界面停留在 AntD 4 时代，视觉风格陈旧。
  - 开发效率低下: 内部开发团队在各项目中重复进行 antd 样式定制、颜色定义、图标处理等工作，效率不高且易出错。缺乏统一、符合内部标准的组件库，阻碍了快速响应业务需求和内部工具的迭代。
  - 特定设计规范落地困难: 公司内部设计规范包含标准色板、特定的字体规范以及基于 Arco Icons 修改和新增的图标体系。现有方式难以将这些规范系统性、低成本地应用到所有内部 B 端项目中。
- 为什么要做？
  - 提升内部系统体验一致性: 统一视觉和交互，降低员工的学习和使用成本。
  - 提高内部开发效率: 提供即用型、符合规范的组件，减少重复劳动，加速内部项目交付。
  - 规范设计与开发协作: 以组件库作为内部设计规范的代码实现，促进设计与开发的协同。
- 为什么现在要做？
  - 团队期望基于成熟稳定的 antd5 进行标准化建设。
  - 新的内部设计规范已确立，需要技术载体落地。
1.2 现状分析
- 现行技术方案:
  - 大部分项目直接依赖 antd@4.x 和antd@5.x
  - 样式定制通过 ConfigProvider 基础配置、CSS/Less 覆盖等方式实现，缺乏统一管理。
  - 颜色、字体、图标的使用方式不统一，与设计规范存在偏差。
  - OA存在两版组件,使用方式不统一,学习成本高
- 造成痛点的原因:
  - OA封装了两套业务组件，定制逻辑分散。 其他项目未封装
  - antd5 主题定制能力未被充分、系统地利用以承载完整设计规范。
  - 未建立内部统一的图标资产管理方案。
  - 部分项目引入 Tailwind CSS，与 antd 定制样式可能存在风格冲突或配置不同步。
二、目标
- 核心目标: 构建一个基于 antd5 的、符合公司内部 B 端设计规范（含颜色、字体、图标体系）的企业级 React 组件库。
- 具体目标:
  1. 视觉统一 (B端风格): slimfit 组件输出严格遵循内部设计规范。
  2. 主题可配置与扩展: 实现中心化主题配置，注入所有设计规范颜色 Token，并支持组件级微调。
  3. 统一图标体系: 提供从 slimfit 导出的、基于 Arco 修改和新增的图标组件。
  4. 开发提效: 显著减少内部项目 UI 定制代码量。
  5. 字体规范落地: 确保指定的内部字体能被正确加载和应用。
  6. Tailwind 友好: 本身不用 Tailwind，但直接提供 Tailwind Preset，方便使用 Tailwind 的内部项目集成。
  7. 可维护性: 最大化复用 antd5，易于维护和升级。
三、技术方案
3.1 技术调研
- 核心策略: 沿用 Ant Design 5 作为基础，利用其强大的主题定制能力注入内部设计规范，并独立构建和管理图标体系。
- 排除的方案:
  - 完全自研 : 周期长、成本高、风险大，无法快速满足内部需求。
- 图标方案演进:
  - 初期考虑直接依赖 @arco-design/web-react/icon (类似方案 D 的思路)，但因需要对 Arco 图标进行样式修改（如线条粗细）并增加大量内部专用图标，无法满足需求。
  - 最终决定: 在 slimfit 内部自建图标体系，以 Arco Icons 的 SVG 源文件为基础，进行修改、新增，并自动化生成 React 组件。
- 选定方案: 基于 antd5 主题定制 + 自建图标体系 (方案 A)。此方案最契合需求，风险和维护成本相对最低，能精确满足样式、颜色、字体、图标的定制需求。
3.2 方案总览
暂时无法在飞书文档外展示此内容
3.3 详细设计
主题引擎设计:
- 背景: 需要将设计规范的颜色、字体、圆角等全面应用到 antd 组件，并支持大量自定义颜色。
- 问题: 仅覆盖 antd 默认 Token 不足以表达所有设计细节和自定义颜色。
- 解决方案:
  1. 在 src/theme/tokens.ts 中定义：
    - antdTokenOverrides: 覆盖 antd 基础 Token (e.g., colorPrimary: '#0052CC').
    - customTokens: 定义所有设计规范的标准颜色 (e.g., colorBrandBlue100: '#E6F7FF', colorNeutralGray500: '#8C8C8C').
import { antdTokenOverrides, customTokens } from './tokens';
import { componentOverrides } from './components'; // 组件覆盖配置

export const themeConfig = {
  token: {
    ...antdTokenOverrides,
    ...customTokens, // 注入所有自定义颜色
  },
  components: componentOverrides, // 应用组件精细调整
};

    - 在 src/theme/components.ts 中定义 componentOverrides，按需覆盖特定组件样式，可以直接使用 token 中的任何值（包括自定义颜色）
export const componentOverrides = {
  Button: {
    colorBgContainerHover: (token) => token.colorNeutralGray100, // 使用自定义 token
    // ... 其他覆盖
  },
  // ... 其他组件
};
    - 创建 src/provider/SlimfitProvider.tsx，内部使用 antd.ConfigProvider 并传入 themeConfig。
- 收益: 实现了设计规范的全面注入，颜色系统统一管理，易于维护和扩展。
图标系统设计:
  - 背景: 需要统一管理基于 Arco 修改和新增的图标，并从 slimfit 提供。
  - 问题: 如何高效生成、管理 React 图标组件，并应用统一的样式修改（如线条粗细）？
  - 解决方案:
    1. SVG 资产: 在 src/icons/svgs/ 目录下维护所有 SVG 源文件。
    2. BaseIcon 组件 (src/icons/BaseIcon.tsx): 提供基础 props (className, style, spin, rotate)，设置默认 fill="currentColor", stroke="currentColor", strokeWidth={/* 您期望的默认粗细 */}, width="1em", height="1em"。
    3. 导出: 在 src/icons/index.ts 中导出所有的图标组件和 IconProps 类型。主入口 src/index.ts 再导出 icons 模块。
  - 收益: 图标资产集中管理，样式统一（线条粗细），新增修改方便，开发者调用简单一致。

字体管理与应用 
- 背景: 需要在所有使用 slimfit 的内部项目中统一应用指定的字体。
- 问题: 如何确保字体文件被加载，并在 CSS 中正确引用？
- 解决方案:
  1. 字体文件托管: 将字体文件（推荐 WOFF2 格式，可加 WOFF 作为备用）托管在公司内部稳定的 CDN 或静态文件服务器上。获取字体的 URL。
  2. 提供 @font-face 规则:
    - 方式: 在 slimfit 包中提供一个独立的 CSS 文件，例如 dist/fonts.css。
    - 内容: 此 CSS 文件包含 @font-face 规则，指向托管的字体文件 URL。
/* slimfit/dist/fonts.css */
@font-face {
  font-family: 'Internal Sans'; /* 与 theme.token.fontFamily 中使用的名称一致 */
  src: url('https://internal-cdn.example.com/fonts/internal-sans-regular.woff2') format('woff2'),
       url('https://internal-cdn.example.com/fonts/internal-sans-regular.woff') format('woff');
  font-weight: 400; /* 或者 'normal' */
  font-style: normal;
  font-display: swap; /* 推荐使用 swap 优化加载体验 */
}

@font-face {
  font-family: 'Internal Sans';
  src: url('https://internal-cdn.example.com/fonts/internal-sans-bold.woff2') format('woff2'),
       url('https://internal-cdn.example.com/fonts/internal-sans-bold.woff') format('woff');
  font-weight: 700; /* 或者 'bold' */
  font-style: normal;
  font-display: swap;
}
    - 使用方式: 要求使用 slimfit 的项目在其全局 CSS 入口文件（如 src/index.css 或 src/App.css）中导入此字体 CSS 文件：@import 'slimfit/dist/fonts.css';。
  3. 主题配置应用字体: 在 src/theme/tokens.ts 的 antdTokenOverrides 中设置 fontFamily
export const antdTokenOverrides = {
  // ...其他 token
  fontFamily: "'Internal Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'", // 将自定义字体放在首位
};

  Antd 的 ConfigProvider 会将此 fontFamily 应用到其管理的组件上。
- 收益: 实现了内部字体的统一加载和应用，确保了品牌视觉的一致性，并且字体文件集中托管，便于管理和更新。

Tailwind CSS 集成方案 (提供 Preset):
- 背景: 方便使用 Tailwind CSS 的内部项目快速、准确地集成 slimfit 的设计规范。
- 问题: 手动在每个项目的 tailwind.config.js 中映射 slimfit 的 token 比较繁琐且容易出错。
- 解决方案:
  1. 创建 Tailwind Preset 文件: 在 slimfit 包内创建一个 Preset 文件，例如 tailwind.preset.js。
  2. Preset 文件内容: 此文件导出一个标准的 Tailwind 配置对象，该对象引用 slimfit 内部定义的、并已导出的 Token（颜色、圆角、字体、间距、阴影等）。
// slimfit/tailwind.preset.js
// 注意：此文件需要在 CJS 环境下可运行，因为它会被 tailwind.config.js require
const { themeConfig } = require('./dist/theme'); // 假设 themeConfig 在构建后位于 dist

const tokens = themeConfig.token; // 获取所有 token

// 将 slimfit token 转换为 tailwind theme 结构
const tailwindTheme = {
  colors: {
    // 直接使用 slimfit 的自定义颜色 token
    ...Object.keys(tokens)
      .filter(key => key.startsWith('color'))
      .reduce((acc, key) => {
          // 将 colorBrandBlue500 转换为 brand-blue-500 (或其他命名)
          const tailwindColorName = key.replace('color', '').replace(/([A-Z])/g, '-$1').toLowerCase().substring(1);
          acc[tailwindColorName] = tokens[key];
          return acc;
      }, {}),
    // 添加语义化颜色映射
    primary: tokens.colorPrimary,
    'primary-hover': tokens.colorPrimaryHover,
    'primary-active': tokens.colorPrimaryActive,
    // ... 其他语义颜色映射
  },
  borderRadius: {
    DEFAULT: `${tokens.borderRadius}px`,
    sm: `${tokens.borderRadiusSM}px`, // 假设有这些 token
    lg: `${tokens.borderRadiusLG}px`, // 假设有这些 token
    // ... 其他圆角尺寸
  },
  fontFamily: {
     // 注意：Tailwind 的 fontFamily 通常是数组或字符串，需处理
     // antdTokenOverrides.fontFamily 是一个 CSS 字符串，可能需要解析或直接用
     sans: tokens.fontFamily.split(',').map(f => f.trim()), // 简单拆分示例
  },
  spacing: {
    // 映射 antd 的间距 token (sizeXXS, sizeXS, sizeSM, etc.) 到 Tailwind 的 spacing scale
    // 这需要一个明确的映射规则
    'xs': `${tokens.sizeXS}px`,
    'sm': `${tokens.sizeSM}px`,
    'md': `${tokens.sizeMD}px`,
    'lg': `${tokens.sizeLG}px`,
    // ...
  },
  boxShadow: {
    // 映射 antd 的 boxShadow token
    DEFAULT: tokens.boxShadow,
    sm: tokens.boxShadowSecondary, // 假设有这些 token
    // ...
  },
  // ... 可以添加 fontSize, lineHeight 等其他映射
};

module.exports = {
  theme: {
    extend: tailwindTheme, // 将 slimfit 的主题扩展到 Tailwind
  },
  plugins: [
    // 如果需要，可以在这里添加一些插件，比如 antd 样式重置相关的？（需要斟酌）
  ],
};

  3. 导出 Preset 路径: 在 slimfit 的 package.json 中可以考虑暴露此 preset 文件的路径，或者在文档中明确告知。
  4. 使用方式: 使用 slimfit 的项目，在其 tailwind.config.js 中引入并使用此 preset：
// consuming-project/tailwind.config.js
const slimfitPreset = require('slimfit/tailwind.preset'); // 引入 preset

module.exports = {
  presets: [slimfitPreset], // 应用 preset
  content: [
    // './src/**/*.{js,jsx,ts,tsx}', // 项目自身文件
    // 如果 slimfit 组件内部 class 可能被 purge，考虑加入 slimfit 路径
    // './node_modules/slimfit/dist/**/*.{js,jsx,ts,tsx}',
  ],
  // 可以在这里覆盖或添加项目特定的 Tailwind 配置
  theme: {
    extend: {
      // 项目自定义的额外颜色或配置
    },
  },
  plugins: [],
};


- 收益: 极大简化了使用 Tailwind 的内部项目接入 slimfit 设计规范的流程，保证了工具类与组件库风格的高度一致性，降低了配置错误风险。同时,也支持其他技术栈的使用
组件导出策略:
- 默认直接从 antd 重新导出大部分组件，保持 API 兼容性。
// src/components/Button/index.ts
export { Button } from 'antd';
export type { ButtonProps } from 'antd';

