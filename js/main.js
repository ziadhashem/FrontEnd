 async function getCharacters() {
        const response = await fetch("https://www.breakingbadapi.com/api/characters");
        const data = await response.json()
        return data;
    }
    async function getEpisodes() {
        const response = await fetch("https://www.breakingbadapi.com/api/episodes");
        const data = await response.json()
        return data;
    }
    async function getQuotes() {
        const response = await fetch("https://www.breakingbadapi.com/api/quotes");
        const data = await response.json()
        return data;
    }
    getCharacters().then(function (result) {
        console.log(result);
        for (i = 0; i<result.length; i++) {
            let name =  result[i].name;
            let img =  result[i].img;
            let nickname =  result[i].nickname
            let birthday =  result[i].birthday
            let portrayed =  result[i].portrayed
            let status = result[i].status;
            let occupation = result[i].occupation;
            let occupation_section = `<ul>`;
            occupation_section += `<li>${occupation[0]}</li>`;
            occupation_section += `</ul>`;
            let card = getCharacterCard(name, img, nickname, birthday, portrayed, status, occupation_section);
            $(`#CHARACTERS`).append(card);
        }
    });

    getQuotes().then(function (result) {
        for (i = 0; i<result.length; i++) {
            let quote =  result[i].quote;
            let author =  result[i].author;
            let card = getQuotesCard(quote, author);
            $(`#QUOTES`).append(card);
        }
    });

    function getQuotesCard(quote, author){
        var colors = ['#b8b5ff', '#ffd384', '#cee6b4'];
        var random_color = colors[Math.floor(Math.random() * colors.length)];
        return ` <div class="quote-box card_text" style="background:${random_color};">
                  <p class="quotation-mark">
                    “
                  </p>
                  <p class="quote-text">
                  ${quote}
                  </p>
                  <hr>
                  <div class="blog-post-actions">
                    <p class="blog-post-bottom pull-left">
                      ${author}
                    </p>
                  </div>
                </div`;
    }

    getEpisodes().then(function (result) {
        let img = 'img/6.jpg';
        for (i = 0; i<result.length; i++) {
            let title =  result[i].title;
            let characters =  result[i].characters;
            let episode = result[i].episode;
            let air_date = result[i].air_date;
            let season = result[i].season;
            let characters_section = '<ul>';
            characters_section += `<li>${characters[0]}</li>`;
            characters_section += `<li>${characters[1]}</li>`;
            characters_section += `<li>${characters[2]}</li>`;
            characters_section += `</ul>`;
            let card = getEpisodeCard(title,img, characters_section, episode, air_date,season);
            $(`#EPISODES`).append(card);
        }
    });

    function getEpisodeCard(title, img, characters_section, episode, air_date, season){
        return` <div class="col mb-3 col-md-3">
                    <!-- Card -->
                    <div class="card">

                        <!--Card image-->
                        <div class="view overlay">
                            <img class="card-img-top" src="${img}" alt="Card image cap">
                            <a href="#!"><div class="mask rgba-white-slight"></div></a>
                        </div>

                        <!--Card content-->
                        <div class="card-body">

                            <!--Title-->
                            <h4 class="card-title card_text">${title}</h4>
                            <!--air date-->
                            <h6 class="card_text">air date : ${air_date}</h6>
                            <!--episode-->
                            <h6 class="card_text">episode : ${episode}</h6>
                            <!--season-->
                            <h6 class="card_text">season : ${season}</h6>
                            <!--Text-->
                            <p class="card_text">characters</p>
                            <div class="row card_text">${characters_section}</div>
                            <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
                            <button type="button" class="btn btn-light-blue btn-md">Read more</button>

                        </div>

                    </div>
                    <!-- Card -->
                </div>`;
    }


    function getEpisodeCharacters(characters){
        let photos = '';
        for (i=0; i<characters.length; i++){
            let character_name = characters[i].name;
            let character_img = getCharacterImg(character_name);
            photos += character_img;
            // characters_images.append(character_img);
            // character_img.append(characters_images);

        }
        characters_images = `<div>${photos}</div>`;
        return $(characters_images).html();
    }

    async function getCharacterByName(name) {
        const response = await fetch("https://www.breakingbadapi.com/api/characters?name="+name);
        const data = await response.json()
        return data;
    }

    function getCharacterImg(character_name) {
       getCharacterByName(character_name).then(function (character){
           return `<img style="border-radius: 45px; border: 1px solid white" src="${character.img}"/>`
       });
    }


    function getCharacterCard(name, img, nickname, birthday, portrayed, status, occupation_section){
        return `  <!-- Team member -->
            <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
                    <div class="mainflip">
                        <div class="frontside">
                            <div class="card">
                                <div class="card-body text-center">
                                    <p><img class=" img-fluid" src="${img}" alt="card image"></p>
                                    <h4 class="card-title">${name}</h4>
                                    <p class="card_text"> Nickname: ${nickname}</p>
                                    <p class="card_text"> Birthday: ${birthday}</p>
                                    <p class="card_text"> Portrayed: ${portrayed}</p>
                                    <p class="card_text"> Status: ${status}</p>
                                    <a href="https://www.fiverr.com/share/qb8D02" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="backside">
                            <div class="card">
                                <div class="card-body text-center mt-4">
                                    <h4 class="card-title">${name}</h4>
                                    <p class="card-text card_text">
                                    <p>Occupation</p>
                                    ${occupation_section}
                                    </p>
                                    <ul class="list-inline">
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                <i class="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                <i class="fa fa-skype"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a class="social-icon text-xs-center" target="_blank" href="https://www.fiverr.com/share/qb8D02">
                                                <i class="fa fa-google"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- ./Team member -->
`;
    }
