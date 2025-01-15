<template>
    <div class="w-80% m-y-0 m-x-auto">
        <div class="flip-container">
            <div class="flip-card">
                <div class="flip-card-front">
                    <!-- 前面的圖片 -->
                    <img src="/images/2025/21186e6643a9046b10830fee3cc823c0.jpg"
                         alt="Front Image">
                </div>
            </div>
        </div>
        <div class="bg-red">
            <div class="box">
              <div>123456</div>
              <div>789</div>
            </div>
        </div>
        <div class="sid bg-yellow">
          <div class="sid2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, fugit dolore. Cupiditate, rem iste quis ipsa expedita itaque quia nam. Totam iste, ipsum perspiciatis minima iusto repudiandae cupiditate, pariatur tempora recusandae illo porro officia facere ratione sed dolorem impedit, omnis quas minus? Expedita eveniet voluptatem repellendus laboriosam, et accusantium nam quis labore illum, nihil sed adipisci ipsa sequi dolore, hic commodi recusandae tempora ullam exercitationem officia est. Consequatur repellat quis quaerat earum nobis, quia distinctio perspiciatis molestias. Ratione perferendis distinctio officiis culpa repellat commodi omnis, atque doloribus delectus et adipisci exercitationem corporis repellendus debitis itaque! Veritatis laboriosam et itaque reiciendis totam quae nisi iste quod officia voluptate ullam rerum, nihil atque quidem facilis molestiae, provident cupiditate. Officia, atque deleniti eligendi magni dignissimos qui soluta aliquam repellat eos quia minima fugiat illum voluptas veritatis et explicabo doloremque incidunt. Ipsa et corporis, dolorum officia pariatur in eveniet, ab modi officiis doloribus veritatis neque praesentium quae minima nihil quo? Odio sit nisi deserunt ipsum itaque ut soluta molestias, laboriosam vero unde temporibus magnam, distinctio rem ea delectus totam quas. Beatae tempore nostrum autem. Minima quibusdam sequi porro corporis. Aperiam, placeat. Reprehenderit modi numquam omnis provident magni facere velit aperiam pariatur vitae tempore necessitatibus obcaecati ab rem, veniam, soluta fugit? Eaque suscipit magnam mollitia fugiat excepturi quis quasi facere perspiciatis sint id voluptates distinctio qui minima doloremque inventore incidunt quidem dignissimos enim ullam ab, quam laboriosam ut soluta? Est obcaecati aliquam nostrum cupiditate rem. Nesciunt, tempore corrupti. Placeat, aliquid dignissimos. Excepturi adipisci blanditiis suscipit nesciunt voluptatum! Quidem, ratione? Nemo totam iusto necessitatibus architecto, distinctio quo officia sed reiciendis exercitationem nisi. Deserunt molestias alias sed eligendi quis dolore delectus eius facere rem praesentium sequi temporibus voluptas numquam, soluta, saepe ab, maxime pariatur earum! At omnis blanditiis quae eveniet delectus cupiditate neque accusantium, facilis minus dolorum!</div>
          <div><img src="/images/2025/21186e6643a9046b10830fee3cc823c0.jpg" alt=""></div>
        </div>
    </div>
</template>

<script setup>
</script>
<style scoped>
.flip-container {
    width: 300px;
    aspect-ratio: 1/1;
    perspective: 1000px; /* 設置3D視角 */
}

.flip-card {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateY(45deg);
}

.flip-card-front {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; /* 隱藏背面 */
    border-radius: 20px;
    overflow: hidden;
}

.flip-card-front {
    background-color: #fff;
}
.box {
    box-sizing: border-box;
    width: fit-content;
    aspect-ratio: 3/2;
    color: white;
    position: relative;
    padding: 8px;
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-width: 0;
        border-bottom-width:3px;
        border-style: solid;
        border-color: transparent;
        background-image: linear-gradient(to right, #68e2ff, #4253eb, #d851ff);
        background-origin: border-box;
        mask-image: linear-gradient(white, white), linear-gradient(white, white);
        mask-clip: padding-box, border-box;
        mask-composite: exclude, add;
    }
}
</style>
