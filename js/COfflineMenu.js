function COfflineMenu(){var e,t,i,n,a;this._init=function(){a=new createjs.Container,s_oStage.addChild(a),(i=new createjs.Shape).graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT),i.alpha=1,e=i.on("click",(function(){})),a.addChild(i),n=new createjs.Container,a.addChild(n);var o=s_oSpriteLibrary.getSprite("msg_box"),r=createBitmap(o);r.regX=.5*o.width,r.regY=.5*o.height,n.addChild(r),n.x=CANVAS_WIDTH/2,n.y=CANVAS_HEIGHT/2;var d=o.width-100,_=new createjs.Rectangle(-d/2,-230,d,300);new CTLText(n,_.x,_.y,_.width,_.height,50,"center","#ffffff",PRIMARY_FONT,1,0,0,TEXT_NETWORK_OFFLINE+"\n\n"+TEXT_RETURN_TO_HOME,!0,!0,!0,!1);(t=new CGfxButton(0,160,s_oSpriteLibrary.getSprite("but_home"),n)).addEventListener(ON_MOUSE_UP,this._onHome,this)},this.unload=function(){t.unload(),i.off("click",e),s_oStage.removeChild(a)},this._onHome=function(){stopSound("crowd"),isPlaying("soundtrack")||playSound("soundtrack",SOUNDTRACK_GENERAL_VOLUME,!0),this.unload(),s_oMain.gotoMenu()},this._init()}