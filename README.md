# small-tween (fork from @tween/tween.js)

[![NPM Version][npm-image]][npm-url]
[![CDNJS][cdnjs-image]][cdnjs-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build and Tests][ci-image]][ci-url]

## 简介

-   用于简单动画的 JavaScript (TypeScript) 补间引擎，结合优化的 Robert Penner 方程式。
-   针对 `@tween/tween.js` 动画库在引用方式上做了精简 (按需引用), 追求极致的最小包体积. (有些功能可能被精简掉了)
-   如有功能缺失, 请使用原始库 `@tween/tween.js`

## 精简后体积

## Usage

### Install

`yarn add small-tween`

---

### Exmaple

```typescript
import { Tween } from 'small-tween'
import { Quadratic } from 'small-tween/easing/quadratic'
import { Linear } from 'small-tween/interpolation/linear'

const box = document.getElementById('box') // 获取我们想要设置动画的元素。
const coords = { x: 0, y: 0 } // 从 (0, 0) 开始
const tween = new Tween(coords, false)
    .to({ x: 300, y: 200 }, 1000) // 在 1 秒内移动到 (300, 200)。
    .easing(TWEEN.Easing.Quadratic.InOut) // 使用缓动函数使动画流畅。
    .onUpdate(() => {
        // 在 tween.js 更新“坐标”后调用。
        // 使用 CSS transform 将 'box' 移动到 'coords' 描述的位置。
        box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
    })
    .start() // 立即开始 tween。

// 设置动画循环。
function animate(time) {
    tween.update(time)
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
```

-   使用极简版本

```typescript
import { Tween } from 'small-tween/mini' // # 改动这行引用
import { Quadratic } from 'small-tween/easing/quadratic'

const box = document.getElementById('box') // 获取我们想要设置动画的元素。
const coords = { x: 0, y: 0 } // 从 (0, 0) 开始
const tween = new Tween(coords, false)
    .to({ x: 300, y: 200 }, 1000) // 在 1 秒内移动到 (300, 200)。
    .easing(TWEEN.Easing.Quadratic.InOut) // 使用缓动函数使动画流畅。
    .onUpdate(() => {
        // 在 tween.js 更新“坐标”后调用。
        // 使用 CSS transform 将 'box' 移动到 'coords' 描述的位置。
        box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
    })
    .start() // 立即开始 tween。

// 设置动画循环。
function animate(time) {
    tween.update(time)
    requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
```

[在 CodePen 上试试这个例子](https://codepen.io/trusktr/pen/KKGaBVz?editors=1000)

# 特性

-   做一件事并且只做一件事：补间属性
-   不处理 CSS 单位（例如附加 `px`）
-   不插值颜色
-   缓动函数可在 Tween 之外重复使用
-   也可以使用自定义缓动函数

# Fork From

-   原始仓库: `https://github.com/tweenjs/tween.js`
-   原始 npm: `https://www.npmjs.com/package/@tweenjs/tween.js`
