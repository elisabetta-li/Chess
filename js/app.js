const BTN_NEXT = "btn-next";
const BTN_BACK = "btn-back";
let window_width = window.innerWidth;

document.addEventListener('DOMContentLoaded', () => {
    replaceHeader();
    replaceBtnHeader();
    replaceCurrentCount();
  });
window.addEventListener("click", function (event) {
    if (
        event.target.classList.contains(BTN_NEXT) ||
        event.target.classList.contains(BTN_BACK)
      ) {
        getSliderData(event.target);
      }
});
window.addEventListener('resize',() => {
    replaceHeader();
    replaceBtnHeader();
    replaceCurrentCount();
});

function getSliderData(btn) {
       parent_block_name = btn.closest(".stages-block")? btn.closest(".stages-block") : btn.closest(".participants-block");
        block_list_name = parent_block_name.querySelector('[class*="-list"]');
        if(btn.classList.contains(BTN_NEXT)) {
           btn_other = parent_block_name.querySelector("." + BTN_BACK);
        } else {
            btn_other = parent_block_name.querySelector("." + BTN_NEXT);
        }
        number = clickMoveSlider(btn, block_list_name, btn_other);  
        changeSliderMark(parent_block_name, number);

}
function clickMoveSlider(btn, block_list_name, btn_other) {
    block_list_width = block_list_name.scrollWidth;
    visual_block_width = block_list_name.offsetWidth;
    margin = String(block_list_name.style.marginLeft).replace("px", "");
    marginLeft = Number(margin);
    btn_other.disabled = false;
    if(btn.classList.contains(BTN_NEXT)){
        marginLeft -=  visual_block_width;
        if(Math.abs(marginLeft) >= (block_list_width-visual_block_width)){
            btn.disabled = true;
        }
    } 
    else if (btn.classList.contains(BTN_BACK)) {
        marginLeft +=  visual_block_width;
        if(Math.abs(marginLeft) < visual_block_width){
            btn.disabled = true;
        }  
    }
    block_list_name.style.marginLeft = `${marginLeft}px`;
    number = Math.abs(marginLeft)/visual_block_width;
    return number;
}
function changeSliderMark(parent_block_name, number) {
    parent_block_name.classList.contains("stages-block")? changeActiveDots(parent_block_name,number) : changeSliderNumber(parent_block_name, number);

}
function changeSliderNumber(parent_block_name, number){
    console
    number += 1;
    slide_number = parent_block_name.querySelector(".current-count");
    number_index = Number(replaceCurrentCount());
    slide_number.innerHTML = `${number*number_index}` 

}
function changeActiveDots(parent_block_name, number) {
    dots_block = parent_block_name.querySelector(".dots-slider-list")
    if(dots_block) {
        dots_list = dots_block.querySelectorAll('.dots-slider');
        dots_list.forEach(dot => {
            dot.classList.remove('active');
        });
        dots_list[number].classList.add('active')
    }
} 
function autoMoveSlider() {
    auto_slider_block = document.querySelector(".participants-list");
    parent_block_name = document.querySelector(".participants-block");
    block_list_width = auto_slider_block.scrollWidth;
    visual_block_width = auto_slider_block.offsetWidth;
    margin = String(auto_slider_block.style.marginLeft).replace("px", "");
    marginLeft = Number(margin);
    marginLeft -=  visual_block_width;
    if((!marginLeft == 0) && (Math.abs(marginLeft) >= block_list_width)){
        marginLeft = 0;
    }
    auto_slider_block.style.marginLeft = `${marginLeft}px`; 
    console.log(marginLeft);
    number = (marginLeft === 0) ? 0 : Math.abs(marginLeft)/visual_block_width;
    console.log(number);
    changeSliderNumber(parent_block_name, number);
    
}
setInterval(autoMoveSlider, 4000);
function replaceHeader() {
    support_header = document.querySelector("#support");
    if (window_width >= 1250) {
        support_header.innerHTML = "Чтобы поддержать Международный васюкинский турнир посетите лекцию на тему:<br> <strong>«Плодотворная дебютная идея»</strong>";  
    } 
    else {
        support_header.innerHTML = "Чтобы поддержать Международный васюкинский турнир";  
    }
    

}
function replaceCurrentCount() {
    current_count = document.querySelector(".current-count");
    let count;
    if(window_width < 820) {
        count = "1";  
    }
    else if (window_width >= 820 && window_width < 1366) {
        count = "2";
    }
    else if (window_width >= 1366) {
        count = "3";
    }
    current_count.innerHTML = count;
    return count;
}function replaceBtnHeader() {
    support_btn = document.querySelector("#supportBtn");
    details_btn = document.querySelector("#detailsBtn");
    if (window_width >= 1366) {
        support_btn.innerHTML = "Поддержать <br> шахматную мысль";
        details_btn.innerHTML = "Подробнее <br> о турнире";
        details_btn.classList.remove("btn-white");
        details_btn.classList.add("btn-outline");
    }
    else {
        support_btn.innerHTML = "Поддержать шахматную мысль";
        details_btn.innerHTML = "Подробнее о турнире";
        details_btn.classList.remove("btn-outline");
        details_btn.classList.add("btn-white");
    }
}
