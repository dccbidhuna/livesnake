 const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const homePage = document.getElementById('homePage');

        let snake = [{ x: 200, y: 200 }];
        let direction = { x: 0, y: 0 };
        let food = { x: 0, y: 0 };
        let score = 0;
        let gameInterval;
        let speed = 200;

        // Game Initialization
        function startGame(level) {
            // Set speed based on difficulty
            if (level === 'easy') speed = 200;
            if (level === 'medium') speed = 150;
            if (level === 'hard') speed = 100;

            // Hide homepage and show canvas
            homePage.style.display = 'none';
            canvas.style.display = 'block';

            // Reset game state
            snake = [{ x: 200, y: 200 }];
            direction = { x: 0, y: 0 };
            score = 0;
            placeFood();

            // Start the game loop
            clearInterval(gameInterval);
            gameInterval = setInterval(gameLoop, speed);
        }

        // Place Food Randomly
        function placeFood() {
            food.x = Math.floor((Math.random() * canvas.width) / 20) * 20;
            food.y = Math.floor((Math.random() * canvas.height) / 20) * 20;
        }

        // Game Loop
        function gameLoop() {
            update();
            draw();
        }

        // Update Game State
        function update() {
            // Move snake
            const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
            snake.unshift(head);

            // Check collision with food
            if (head.x === food.x && head.y === food.y) {
                score++;
                placeFood();
            } else {
                snake.pop();
            }

            // Check collisions
            if (
                head.x < 0 ||
                head.x >= canvas.width ||
                head.y < 0 ||
                head.y >= canvas.height ||
                snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
            ) {
                clearInterval(gameInterval);
                alert(`Game Over! Your score: ${score}`);
                homePage.style.display = 'block';
                canvas.style.display = 'none';
            }
        }

        // Draw Game
        function draw() {
            // Clear canvas
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw snake
            ctx.fillStyle = 'lime';
            snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, 20, 20);
            });

            // Draw food
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, 20, 20);

            // Draw score
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText(`Score: ${score}`, 10, 20);
        }

        // Handle Keyboard Input
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) direction = { x: 0, y: -20 };
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) direction = { x: 0, y: 20 };
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) direction = { x: -20, y: 0 };
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) direction = { x: 20, y: 0 };
                    break;
            }
        });
