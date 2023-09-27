const slot_machine = document.getElementById("slot_machine");
const slot_list_1 = document.getElementById("slot_list_1");
const slot_list_2 = document.getElementById("slot_list_2");
const slot_list_3 = document.getElementById("slot_list_3");
const win_link="https://www.google.com";

const options = [
    {
        id: 1,
        img: "assets/img/cow_face.png",
        gif: "assets/img/cow_face.gif",
        music: "assets/music/cow.mp3"
    },
    {
        id: 2,
        img: "assets/img/dog_face.png",
        gif: "assets/img/dog_face.gif",
        music: "assets/music/dog.mp3"
    },
    {
        id: 3,
        img: "assets/img/frog.png",
        gif: "assets/img/frog.gif",
        music: "assets/music/frog.mp3"
    },
    {
        id: 4,
        img: "assets/img/hear_no_evil_monkey.png",
        gif: "assets/img/hear_no_evil_monkey.gif",
        music: "assets/music/monkey.mp3"
    },
    {
        id: 5,
        img: "assets/img/horse.png",
        gif: "assets/img/horse.gif",
        music: "assets/music/horse.mp3"
    },
    {
        id: 6,
        img: "assets/img/kangaroo.png",
        gif: "assets/img/kangaroo.gif",
        music: "assets/music/kangaroo.mp3"
    },
    {
        id: 7,
        img: "assets/img/owl.png",
        gif: "assets/img/owl.gif",
        music: "assets/music/owl.mp3"
    },
    {
        id: 8,
        img: "assets/img/penguin.png",
        gif: "assets/img/penguin.gif",
        music: "assets/music/penguin.mp3"
    },
    {
        id: 9,
        img: "assets/img/pig_face.png",
        gif: "assets/img/pig_face.gif",
        music: "assets/music/pig.mp3"
    },
    {
        id: 10,
        img: "assets/img/rabbit_face.png",
        gif: "assets/img/rabbit_face.gif",
        music: "assets/music/rabbit.mp3"
    },
    {
        id: 11,
        img: "assets/img/rooster.png",
        gif: "assets/img/rooster.gif",
        music: "assets/music/rooster.mp3"
    },
    {
        id: 12,
        img: "assets/img/see_no_evil_monkey.png",
        gif: "assets/img/see_no_evil_monkey.gif",
        music: "assets/music/monkey.mp3"
    },
    {
        id: 13,
        img: "assets/img/sloth.png",
        gif: "assets/img/sloth.gif",
        music: "assets/music/sloth.mp3"
    },
    {
        id: 14,
        img: "assets/img/snake.png",
        gif: "assets/img/snake.gif",
        music: "assets/music/snake.mp3"
    },
    {
        id: 15,
        img: "assets/img/speak_no_evil_monkey.png",
        gif: "assets/img/speak_no_evil_monkey.gif",
        music: "assets/music/monkey.mp3"
    },
    {
        id: 16,
        img: "assets/img/spouting_whale.png",
        gif: "assets/img/spouting_whale.gif",
        music: "assets/music/whale.mp3"
    },
    {
        id: 17,
        img: "assets/img/unicorn.png",
        gif: "assets/img/unicorn.gif",
        music: "assets/music/horse.mp3"
    },
    {
        id: 18,
        img: "assets/img/teddy_bear.png",
        gif: "assets/img/teddy_bear.gif",
        music: "assets/music/teddy_bear.mp3"
    }
];
let inner_html="";
options.forEach((opt) => {
    const { id, img } = opt;
    inner_html+= `
        <li class="slot_item" data-item_id="${id}">
            <img class="slot_itemImg" src="${img}"/>
        </li>
    `;
});
slot_list_1.innerHTML=inner_html;
slot_list_2.innerHTML=inner_html;
slot_list_3.innerHTML=inner_html;

const sound = new Audio("assets/music/slot_machine_wheel.wav");
const ding = new Audio("assets/music/ding.wav");
$(document).ready(function(){
    $("#spin_btn,.slot_machine_handle").click(function(){
        $("#spin_btn,.slot_machine_handle").attr("disabled","disabled");
        $(".slot_machine").addClass("active");
        setTimeout(()=>{
            $(".slot_machine").removeClass("active");
        },2000);
        sound.play();
        const value_arr=[];
        $("#slot_listView .slot_list").playSpin({
            stopSeq: 'leftToRight',
            endNum: [13,13,13],
            onEnd: function(num) {
                ding.play();
                value_arr.push(num);
            },
            onFinish: function(num) {
                sound.pause();
                const targetValue = value_arr[0];
                const allValuesEqual = value_arr.every(item => item === targetValue);
                if (allValuesEqual) {
                    const {gif,music}=options[targetValue-1];
                    $("#prize_preview").html(`<img src="${gif}">`);
                    $("#prize_previewContainer").fadeIn();
                    const prize_music=new Audio(`${music}`);
                    prize_music.play();

                    prize_music.addEventListener("ended", function(){
                        $("#prize_previewContainer").fadeOut();
                        window.top.location.href=`${win_link}`;
                    });
                } else {
                    console.log(options[targetValue]);
                }
                $("#spin_btn,.slot_machine_handle").removeAttr("disabled");
            }
        });

    });
})