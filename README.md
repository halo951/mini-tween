# tween-mp (fork from @tween/tween.js)

[![NPM Version][npm-image]][npm-url]
[![CDNJS][cdnjs-image]][cdnjs-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build and Tests][ci-image]][ci-url]

## Abort 

适用于小程序版本的 @tween/tween.js 动画库

## Usage

- install: `yarn add tween-mp`
- build NPM
- example

---

```typescript
import { Tween, Easing, Interpolation } from 'small-tween'

const box = document.getElementById('box') // 获取我们想要设置动画的元素。
const coords = { x: 0, y: 0 } // 从 (0, 0) 开始
const tween = new Tween(coords, false)
    .to({ x: 300, y: 200 }, 1000) // 在 1 秒内移动到 (300, 200)。
    .easing(Easing.Quadratic.InOut) // 使用缓动函数使动画流畅。
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

# Fork From

-   原始仓库: `https://github.com/tweenjs/tween.js`
-   原始 npm: `https://www.npmjs.com/package/@tweenjs/tween.js`
