# deferred-load-image
deferred load image in one page. 按顺序依次加载页面中的图片，使用Promise对象

## Dependency / 依赖：
jQuery 2.x  
animate.css https://daneden.github.io/animate.css (如果不需要动画效果，可不引入)  

## How to use / 使用：  

使用默认动画，延迟500ms加载  
```DL_IMAGE.loadImage();  ```    


使用自定义动画，自定义延迟时间加载   
```DL_IMAGE.loadImage('swing',1000);  ```    
