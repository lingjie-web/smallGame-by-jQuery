
    $(function () {
          var timer=null
          // 监听输入框是否有内容，解除按钮禁用
          $('input').on('propertychange input',function(){
            if($('.login .name').val()!==''&&$('.login .pas').val()!==''){
              $('.gameStart').removeAttr('disabled')
            }else{
              $('.gameStart').attr('disabled','true')
            }
          })
    
            // 开始游戏按钮的点击条件判断与执行事件
            $('.gameStart').on('click',function () {
            if($('.login input').filter('.name').val()=='admin'&&$('.login input').filter('.pas').val()=='123456'){
              
              $('.loginBgc').hide()
              gameStart()
            }else{
              alert('用户名或密码错误')
            }
          })

          // 获取历史最高分函数
          let getScoreHigh=function(){
            let arr=new Array
            let maxScore=0
            for(let i in window.localStorage){
              if(!isNaN(window.localStorage[i]-0)){arr.push(parseInt(window.localStorage[i]))}
            }
            arr.splice(arr.length-1,1)
            for(let i =0 ;i<arr.length-1;i++){
              maxScore=arr[i]> maxScore?arr[i]: maxScore
            }
            return maxScore
          }

          // 结束游戏函数
          let gameOver=function(){
            clearInterval(timer)
            $('.gameView').hide()
            window.localStorage.setItem(`score${Math.random()}`,$('.score>span').eq(1).text())
            $('.reStart').show()
            $('.lastScore1>span').eq(1).text( $('.score>span').eq(1).text())
            $('.lastScore2>span').eq(1).text(getScoreHigh())
          }

            // 开始游戏函数
          let gameStart=function(){
            $('.score>span').eq(1).text(0)
            $('.gameView').show()
            // 创建事件条
            $('.timeLine>div').animate({'width':0},5000,'linear',function () {
              gameOver()
              alert('时间到，游戏结束')
          })
            
          
          $('.score>span').eq(3).text(getScoreHigh())

            // 开始游戏
            let gametime=0
                let timerspeed=700
                let gamespeed=4000
             timer=setInterval(() => {
                gametime++
                 if(gametime<20){
                  gamespeed=4000-gametime*100
                   timerspeed=1000-gametime*20}
               //  产生装黑白块的容器
                $('.content').prepend( $('<ul class="box"><li></li><li></li><li></li><li></li><li></li><li></li></ul>')
           )
             // 黑块白块的随机数
           let numLi = parseInt(Math.random()*6)
           const error1 = parseInt(Math.random()*6)
           const error2 = parseInt(Math.random()*6)
           const error4 = parseInt(Math.random()*6)
           const error3 = parseInt(Math.random()*6)
           const error5 = parseInt(Math.random()*6)
          //  添加样式和类名
           $('.box>li').eq(error1).addClass('error')
           $('.box>li').eq(error2).addClass('error')
           $('.box>li').eq(error3).addClass('error')
           $('.box>li').eq(error4).addClass('error')
           $('.box>li').eq(error5).addClass('error')
            // 把白块上的error样式移除
           if($('.box>li').eq(numLi).filter('err')){
             $($('.box>li').eq(numLi)).removeClass('error')
           }
           $('.box>li').eq(numLi).addClass('active')
          //  游戏动画
           $('.box').animate({'top':800},gamespeed,'linear',function(){
             $(this).remove()
           })
           setInterval(() => {
           }, 1000);
          }, timerspeed);
        }

           // 点击事件委托
      $(document).delegate('.box>li','click',function () {
          if($(this).hasClass('active')){
            // 白块加分
            let score=parseInt($('.score>span').eq(1).text())
            score+=10
            $('.score>span').eq(1).text(score)
            $(this).parents('.box').remove()
          }else if(
          // 黑块点击掉一颗星  
          $(this).hasClass('error')){
            $('.life>li').eq($('.life>li').length-1).remove()
            if($('.life>li').length>0){
              $(this).parents('.box').remove()
            }else{
              gameOver()
              alert('失误过多，游戏结束')
            }
          }
      })

      // 重新开始按钮
      $('.reStart .btn').on('click',function () {
        $('.reStart').hide(),
        gameStart()
      })
    })

  