	var ctx, cvs, sname = "m_score_shooting";
	var itv_update, fps = 30;
	var itv_spawn, spawn_rate, spawn_dir;
	var bullet_rate, lives, score;
	var enemies = [],
		bullets = [];

	function mRandom() {
		return Math.random();
	}

	function mFloor(i) {
		return Math.floor(i);
	}
	/* Game Objects */
	function Shooter() {
		this.img = new Image();
		this.img.src = "../images/shooter.png";
		this.deg = 0;
		this.speed = 10;
		this.width = 60;
		this.height = 100;
		this.x = (cvs.width - this.width) / 2;
		this.y = cvs.height - this.height;
	}
	Shooter.prototype.draw = function() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.translate(this.width / 2, this.height / 2);
		ctx.rotate(this.deg * Math.PI / 180);
		ctx.drawImage(this.img, -(this.width / 2), -(this.height / 2));
		ctx.restore();
	};
	Shooter.prototype.shoot = function() {
		if (this.locked) {
			return false;
		}
		bullets.push(new Bullet());
		this.locked = true;
		setTimeout("shooter.unlock();", 1000 / bullet_rate);
	}
	Shooter.prototype.unlock = function() {
		this.locked = false;
	}

	function Enemy() {
		this.radius = 20;
		this.x = mFloor((mRandom() * (cvs.width - (2 * this.radius))) + this.radius);
		this.y = -this.radius;
		this.speed = 7;
		this.alive = true;
		diff_x = ((shooter.x + (shooter.width / 2)) - this.x);
		diff_y = ((spawn_dir * cvs.height) - this.y);
		mul = this.speed / Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2));
		this.dx = mul * diff_x;
		this.dy = mul * diff_y;
	}
	Enemy.prototype.draw = function() {
		this.x += this.dx;
		this.y += this.dy;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#000000";
		ctx.fill();
	}
	Enemy.prototype.checkAlive = function() {
		for (var i = 0; i < bullets.length; i++) {
			b = bullets[i];
			if (b.alive) {
				diff = Math.sqrt(Math.pow(this.x - b.x, 2) + Math.pow(this.y - b.y, 2));
				if (diff < (this.radius + b.radius)) {
					this.alive = false;
					b.alive = false;
					score += 10;
					return false;
				}
			}
		}
		if (this.y > (cvs.height - 120 - this.radius + 5)) {
			lives -= 1;
			this.alive = false;
		}
	}

	function Bullet() {
		this.x = shooter.x + shooter.width / 2;
		this.y = shooter.y + shooter.height / 2;
		this.speed = 10;
		this.radius = 5;
		this.alive = true;
		this.dx = this.speed * Math.sin(shooter.deg * Math.PI / 180);
		this.dy = -this.speed * Math.cos(shooter.deg * Math.PI / 180);
	}
	Bullet.prototype.draw = function() {
		this.x += this.dx;
		this.y += this.dy;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#DDDDDD";
		ctx.fill();
	}
	/* Game Functions */
	function inView(obj) {
		if (obj.x >= 0 && obj.x < cvs.width) {
			if (obj.y >= 0 && obj.y < cvs.height) {
				return true;
			}
		}
		return false;
	}

	function spawnEnemy() {
		enemies.push(new Enemy());
		itv_spawn = setTimeout(spawnEnemy, 1000 / spawn_rate);
	}

	function endGame() {
		clearTimeout(itv_update);
		clearTimeout(itv_spawn);
		setTimeout("endGame2('Shooting Game', score);", 3000);
	}

	function pauseGame() {
		clearTimeout(itv_update);
		clearTimeout(itv_spawn);
		document.onkeypress = null;
		cvs.onclick = resumeGame;
	}

	function resumeGame() {
		update();
		spawnEnemy();
		document.onkeypress = onKeyPress;
		cvs.onclick = pauseGame;
	}
	/* Canvas Functions */
	function draw() {
		ctx.clearRect(0, 0, cvs.width, cvs.height);
		cvs.onclick = pauseGame;
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].draw();
		}
		for (var i = 0; i < bullets.length; i++) {
			bullets[i].draw();
		}
		shooter.draw();
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, cvs.height - 120, cvs.width, 5);
		ctx.fillStyle = "#  ";
		ctx.font = "17px Arial";
		ctx.fillText("Score: " + score.toString(), 20, 30);
		ctx.fillText("Lives: " + lives.toString(), cvs.width - 70, 30);
	}

	function init() {
		cvs = document.getElementById("canvas");
		cvs.onclick = console.log();
		ctx = cvs.getContext("2d");
		shooter = new Shooter();
		score = 0;
		lives = 5;
		enemies = [];
		spawn_rate = 1;
		spawn_dir = 1;
		bullets = [];
		bullet_rate = 15;
		update();
		spawnEnemy();
	}

	function update() {
		draw();
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].checkAlive();
		}
		if (lives < 0) {
			lives = 0;
			endGame();
			return false;
		}
		dead = enemies.filter(function(i) {
			if (!i.alive) {
				delete i;
			}
		});
		enemies = enemies.filter(function(i) {
			return i.alive;
		});
		dead = bullets.filter(function(i) {
			if (!i.alive) {
				delete i;
			}
		});
		bullets = bullets.filter(function(i) {
			return i.alive;
		});
		// Difficulty
		spawn_rate = Math.floor((score / 250) + 1);
		spawn_dir = Math.floor((score / 160) * 0.1 + 1);
		bullet_rate = (score / 240) * -1 + 15;
		if (bullet_rate < 10) {
			bullet_rate = 10;
		}
		itv_update = setTimeout(update, 1000 / fps);
	}

	function onKeyPress(e) {
		switch (e.keyCode) {
			case 97:
				shooter.deg -= shooter.speed;
				shooter.deg %= 360;
				break;
			case 100:
				shooter.deg += shooter.speed;
				shooter.deg %= 360;
				break;
			case 32:
				shooter.shoot();
				break;
		}
		if (shooter.deg > 90) {
			shooter.deg = 90;
		}
		if (shooter.deg < -90) {
			shooter.deg = -90;
		}
	}
	document.onkeypress = onKeyPress;
