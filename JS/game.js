//Hello World of Phaser = Basic Game = Single Scene in Spin & Win Game
//How to create the basic skeleton for the game -> Game Loop

prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}



let config = {
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
    
     
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //load object, load some images
    this.load.image('background', '../Assets/back.jpg');
    //console.log(this);
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    this.load.image('startBtn','../Assets/button.png');
    this.load.image('yougot','../Assets/yougot.png');
    this.load.audio('spin','../Assets/sound.ogg');
    
    
}
function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
    let stand = this.add.sprite(W/2,H/2+250,'stand');
    stand.setScale(0.25);
    
    this.wheel = this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.25);
    
    let pin = this.add.sprite(W/2,H/2-250,'pin');
    pin.setScale(0.25);
    
    this.startBtn = this.add.sprite(W/2, H/2, 'startBtn').setScale(.50).setInteractive({
        cursor: 'pointer'
    });
    
    this.yougot = this.add.sprite(400, 300, 'yougot').setScale(0.6);
    this.yougot.visible = false;
    
    //event listener for mouse click
    //this.input.on("pointerdown",spinwheel,this);
    
    //lets create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
    
    this.spin = this.sound.add('spin');
    this.startBtn.on('pointerdown',spinwheel,this);
    
}

function spinwheel() {
    console.log("You clicked the mouse");
    console.log("Start Spinning");
    //this.game_text.setText("Spinning...");
    
    let W = game.config.width;
    let H = game.config.height;
    this.startBtn.visible = false;
    
    this.sound.play('spin');

    let prizes = ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix Subs","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"];
    
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    
    let tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: 'cubic.out',
        duration: 6000,
        //callbackScope : this,
        /*onComplete: function() {
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
        }*/
    })
    
    setTimeout(() => {
        console.log("Timeout to freeze the mouse")
        //this.pin.visible = false;
        this.yougot.visible = true;
        this.add.text(W / 2 - 60 , H / 2 + 50,`${prizes[idx]}`, {
            fontSize: '25px',
            fontFamily: 'Times New Roman',
            color: 'orange',
        });
        this.input.on("pointerdown", restart, this);
    }, 6000);

    
}

//Game Loop
function update(){
    console.log("Inside Update");
    //this.wheel.angle += 1;
}


function restart() {
    this.scene.restart();

}