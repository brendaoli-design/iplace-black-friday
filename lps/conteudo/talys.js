var t4GetStyles = document.documentElement.style;

// START PART8

var t4ihbf23GetWidhtPart8 = document.getElementById('t4-ihbf23-part8-item1').clientWidth;
var t4ihbf23GetHeightPart8 = document.getElementById('t4-ihbf23-part8-item1').clientHeight;
var t4ihbf23ActualBannerPart8 = 0;

t4GetStyles.setProperty('--t4ihbfWidthPart8', t4ihbf23GetWidhtPart8 + "px");
t4GetStyles.setProperty('--t4ihbfHeightPart8', t4ihbf23GetHeightPart8 + "px");

function t4ihbf23Part8Op1() {
    document.getElementById('t4-ihbf23-part8-floating-box-hidden').style.left = '-20px';
    document.getElementById('t4ihbf23Part8Op1Txt').classList.add('t4ihbf23Part8Active');
    document.getElementById('t4ihbf23Part8Op2Txt').classList.remove('t4ihbf23Part8Active');

    document.getElementById('t4-ihbf23-part8-item2-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart8) * 0)';
}

function t4ihbf23Part8Op2() {
    document.getElementById('t4-ihbf23-part8-floating-box-hidden').style.left = 'calc(var(--t4ihbfWidthPart8Options2) - 20px)';
    document.getElementById('t4ihbf23Part8Op1Txt').classList.remove('t4ihbf23Part8Active');
    document.getElementById('t4ihbf23Part8Op2Txt').classList.add('t4ihbf23Part8Active');

    document.getElementById('t4-ihbf23-part8-item2-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart8) * -1)';
}

function t4ihbf23Part8SetCount1() {
    t4ihbf23ActualBannerPart8 = 0;
    t4ihbf23UpdateBannerPart8();
}

function t4ihbf23Part8SetCount2() {
    t4ihbf23ActualBannerPart8 = 1;
    t4ihbf23UpdateBannerPart8();
}

function t4ihbf23UpdateBannerPart8() {
    if (t4ihbf23ActualBannerPart8 > 1) {
        t4ihbf23ActualBannerPart8 = 0;
        t4ihbf23Part8Op1();
    }

    else {
        if (t4ihbf23ActualBannerPart8 == 0) {
            t4ihbf23Part8Op1();
        }

        if (t4ihbf23ActualBannerPart8 == 1) {
            t4ihbf23Part8Op2();
        }
    }
}

function t4ihbf23UpdateActualBannerPart8() {
    if (t4ihbf23ActualBannerPart8 == 2) {
        t4ihbf23ActualBannerPart8 = 0;
    }

    else {
        t4ihbf23ActualBannerPart8 = t4ihbf23ActualBannerPart8 + 1;
    }
}

/*
var t4ihbf23TimerPart8 = 8000;

function t4ihbf23FunctionTimerPart8() {
    setInterval(
        t4ihbf23UpdateActualBannerPart8(),
        t4ihbf23UpdateBannerPart8()
    ), t4ihbf23TimerPart8;
}

setInterval(t4ihbf23FunctionTimerPart8, t4ihbf23TimerPart8)
*/

// END PART8

// START PART10

var t4ihbf23GetWidhtPart10 = document.getElementById('t4-ihbf23-part10-item1').clientWidth;
var t4ihbf23GetHeightPart10 = document.getElementById('t4-ihbf23-part10-item1').clientHeight;
var t4ihbf23ActualBannerPart10 = 0;

t4GetStyles.setProperty('--t4ihbfWidthPart10', t4ihbf23GetWidhtPart10 + "px");
t4GetStyles.setProperty('--t4ihbfHeightPart10', t4ihbf23GetHeightPart10 + "px");

function t4ihbf23Part10Op1() {
    document.getElementById('t4-ihbf23-part10-floating-box-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10Options4) * 0)';
    document.getElementById('t4-ihbf23-part10-item2-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10) * 0)';

    document.getElementById('t4ihbf23Part10Op1Txt').classList.add('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op2Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op3Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op4Txt').classList.remove('t4ihbf23Part10Active');
}

function t4ihbf23Part10Op2() {
    document.getElementById('t4-ihbf23-part10-floating-box-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10Options4) * 1)';
    document.getElementById('t4-ihbf23-part10-item2-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10) * -1)';

    document.getElementById('t4ihbf23Part10Op1Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op2Txt').classList.add('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op3Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op4Txt').classList.remove('t4ihbf23Part10Active');
}

function t4ihbf23Part10Op3() {
    document.getElementById('t4-ihbf23-part10-floating-box-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10Options4) * 2)';
    document.getElementById('t4-ihbf23-part10-item2-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10) * -2)';

    document.getElementById('t4ihbf23Part10Op1Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op2Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op3Txt').classList.add('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op4Txt').classList.remove('t4ihbf23Part10Active');
}

function t4ihbf23Part10Op4() {
    document.getElementById('t4-ihbf23-part10-floating-box-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10Options4) * 3)';
    document.getElementById('t4-ihbf23-part10-item2-hidden').style.marginLeft = 'calc(var(--t4ihbfWidthPart10) * -3)';

    document.getElementById('t4ihbf23Part10Op1Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op2Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op3Txt').classList.remove('t4ihbf23Part10Active');
    document.getElementById('t4ihbf23Part10Op4Txt').classList.add('t4ihbf23Part10Active');
}

function t4ihbf23UpdateBannerPart10() {
    if (t4ihbf23ActualBannerPart10 > 3) {
        t4ihbf23ActualBannerPart10 = 0;
        t4ihbf23Part10Op1();
    }

    if (t4ihbf23ActualBannerPart10 < 0) {
        t4ihbf23ActualBannerPart10 = 3;
        t4ihbf23Part10Op4();
    }

    else {
        if (t4ihbf23ActualBannerPart10 == 0) {
            t4ihbf23Part10Op1();
        }
        if (t4ihbf23ActualBannerPart10 == 1) {
            t4ihbf23Part10Op2();
        }
        if (t4ihbf23ActualBannerPart10 == 2) {
            t4ihbf23Part10Op3();
        }
        if (t4ihbf23ActualBannerPart10 == 3) {
            t4ihbf23Part10Op4();
        }
    }
}

function t4ihbf23UpdateActualBannerPart10() {
    if (t4ihbf23ActualBannerPart10 == 4) {
        t4ihbf23ActualBannerPart10 = 0;
    }

    else {
        t4ihbf23ActualBannerPart10 = t4ihbf23ActualBannerPart10 + 1;
    }
}

function t4ihbf23UpdateReverseActualBannerPart10() {
    if (t4ihbf23ActualBannerPart10 < 0) {
        t4ihbf23ActualBannerPart10 = 3;
    }

    else {
        t4ihbf23ActualBannerPart10 = t4ihbf23ActualBannerPart10 - 1;
    }
}


/*
var t4ihbf23TimerPart10 = 6000;

function t4ihbf23FunctionTimerPart10() {
    setInterval(
        t4ihbf23UpdateActualBannerPart10(),
        t4ihbf23UpdateBannerPart10()
    ), t4ihbf23TimerPart10;
}

setInterval(t4ihbf23FunctionTimerPart10, t4ihbf23TimerPart10)
*/

function t4ihbf23FunctionNextBannerPart10() {
    t4ihbf23UpdateActualBannerPart10(),
        t4ihbf23UpdateBannerPart10()
};

function t4ihbf23FunctionPrevBannerPart10() {
    t4ihbf23UpdateReverseActualBannerPart10(),
        t4ihbf23UpdateBannerPart10()
};





var t4ihbf23GetWidhtPart19 = document.getElementsByClassName('t4-ihbf23-part19')[0].clientWidth;
var t4ihbf23GetReviewsSizeWidth = document.getElementById('t4Review1').offsetWidth;
var t4ihbf23GetReviewsSizeHeight = document.getElementById('t4Review1').clientHeight;
var t4ReviewHiddenBox = document.getElementById('t4-ihbf23-part19-item2-hidden');
var t4ihbf23ReviewsActualReview = -1;
var t4ihbf23AddictedMargin = 0;

t4GetStyles.setProperty('--t4ihbfWidthPart19', t4ihbf23GetWidhtPart19 + "px");
t4GetStyles.setProperty('--t4ReviewHeight', t4ihbf23GetReviewsSizeHeight + "px");

if (t4ihbf23GetWidhtPart19 >= 500) {
    t4GetStyles.setProperty('--t4ReviewWidth', "calc(calc(var(--t4ihbfWidthPart19) / 22) * 10)");
}

else {
    t4GetStyles.setProperty('--t4ReviewWidth', "calc(calc(var(--t4ihbfWidthPart19) / 22) * 15)");
}

function t4UpdateAddictedMargin() {
    t4GetStyles.setProperty('--t4RHBAddictedMargin', t4ihbf23AddictedMargin + "px");
}

function t4ihbf23RHBNextReview() {

    if (t4ihbf23GetWidhtPart19 >= 600) {
        t4ihbf23ReviewsActualReview = t4ihbf23ReviewsActualReview - 1;
        t4ihbf23AddictedMargin = t4ihbf23AddictedMargin + t4ihbf23GetReviewsSizeWidth;

        console.log(t4ihbf23GetReviewsSizeWidth);

        t4UpdateAddictedMargin();
        t4RHBFocusReview();

        if (t4ihbf23ReviewsActualReview == -8) {
            t4ihbf23ReviewsActualReview = -1;
            t4ihbf23AddictedMargin = 0;

            t4UpdateAddictedMargin();
            t4RHBFocusReview();
        }
    }

    else {
        t4ihbf23ReviewsActualReview = t4ihbf23ReviewsActualReview - 1;
        t4ihbf23AddictedMargin = t4ihbf23AddictedMargin + t4ihbf23GetReviewsSizeWidth + t4ihbf23GetReviewsSizeWidth / 2;

        console.log(t4ihbf23GetReviewsSizeWidth);

        t4UpdateAddictedMargin();
        t4RHBFocusReview();

        if (t4ihbf23ReviewsActualReview == -8) {
            t4ihbf23ReviewsActualReview = -1;
            t4ihbf23AddictedMargin = 0;

            t4UpdateAddictedMargin();
            t4RHBFocusReview();
        }
    }
};

function t4ihbf23RHBPreviousReview() {

    if (t4ihbf23GetWidhtPart19 >= 600) {
        t4ihbf23ReviewsActualReview = t4ihbf23ReviewsActualReview + 1;
        t4ihbf23AddictedMargin = t4ihbf23AddictedMargin - t4ihbf23GetReviewsSizeWidth;

        t4UpdateAddictedMargin();
        t4RHBFocusReview();

        if (t4ihbf23ReviewsActualReview == 0) {
            t4ihbf23ReviewsActualReview = -7;
            t4ihbf23AddictedMargin = t4ihbf23GetReviewsSizeWidth * 6;

            console.log(t4ihbf23ReviewsActualReview)

            t4UpdateAddictedMargin();
            t4RHBFocusReview();
        }
    }

    else {
        t4ihbf23ReviewsActualReview = t4ihbf23ReviewsActualReview + 1;
        t4ihbf23AddictedMargin = t4ihbf23AddictedMargin - t4ihbf23GetReviewsSizeWidth - t4ihbf23GetReviewsSizeWidth / 2;

        t4UpdateAddictedMargin();
        t4RHBFocusReview();

        if (t4ihbf23ReviewsActualReview == 0) {
            t4ihbf23ReviewsActualReview = -7;
            t4ihbf23AddictedMargin = t4ihbf23GetReviewsSizeWidth * 9;

            console.log(t4ihbf23ReviewsActualReview)

            t4UpdateAddictedMargin();
            t4RHBFocusReview();
        }
    }

};

function t4RHBFocusReview() {

    if (t4ihbf23ReviewsActualReview == -1) {
        document.getElementById('t4Review1').classList.remove('t4RHBFocused');
        document.getElementById('t4Review2').classList.add('t4RHBFocused');
        document.getElementById('t4Review3').classList.remove('t4RHBFocused');
    }

    if (t4ihbf23ReviewsActualReview == -2) {
        document.getElementById('t4Review2').classList.remove('t4RHBFocused');
        document.getElementById('t4Review3').classList.add('t4RHBFocused');
        document.getElementById('t4Review4').classList.remove('t4RHBFocused');
    }

    if (t4ihbf23ReviewsActualReview == -3) {
        document.getElementById('t4Review3').classList.remove('t4RHBFocused');
        document.getElementById('t4Review4').classList.add('t4RHBFocused');
        document.getElementById('t4Review5').classList.remove('t4RHBFocused');
    }

    if (t4ihbf23ReviewsActualReview == -4) {
        document.getElementById('t4Review4').classList.remove('t4RHBFocused');
        document.getElementById('t4Review5').classList.add('t4RHBFocused');
        document.getElementById('t4Review6').classList.remove('t4RHBFocused');
    }

    if (t4ihbf23ReviewsActualReview == -5) {
        document.getElementById('t4Review5').classList.remove('t4RHBFocused');
        document.getElementById('t4Review6').classList.add('t4RHBFocused');
        document.getElementById('t4Review7').classList.remove('t4RHBFocused');
    }

    if (t4ihbf23ReviewsActualReview == -6) {
        document.getElementById('t4Review6').classList.remove('t4RHBFocused');
        document.getElementById('t4Review7').classList.add('t4RHBFocused');
        document.getElementById('t4Review8').classList.remove('t4RHBFocused');
    }

    if (t4ihbf23ReviewsActualReview == -7) {
        document.getElementById('t4Review7').classList.remove('t4RHBFocused');
        document.getElementById('t4Review8').classList.add('t4RHBFocused');
        document.getElementById('t4Review1').classList.remove('t4RHBFocused');
    }

    if (t4ihbf23ReviewsActualReview == -8) {
        document.getElementById('t4Review8').classList.remove('t4RHBFocused');
        document.getElementById('t4Review1').classList.add('t4RHBFocused');
    }
};


let t4ihbf23T1touchstartX = 0
let t4ihbf23T1touchendX = 0

var t4ihbf23T1differenceValue = 0;
var t4ihbf23T1minimumSwipeRight = t4ihbf23GetWidhtPart10 / 5;
var t4ihbf23T1minimumSwipeLeft = t4ihbf23T1minimumSwipeRight * -1;
var t4ihbf23GetIdPart10 = document.getElementById('servicos');

function t4ihbf23T1identifyDifference() {
    t4ihbf23T1differenceValue = t4ihbf23T1touchstartX - t4ihbf23T1touchendX;
};

function t4ihbf23T1checkDirection() {

    t4ihbf23T1identifyDifference();

    if (t4ihbf23T1differenceValue > 0 && (t4ihbf23T1differenceValue > t4ihbf23T1minimumSwipeRight)) {
        t4ihbf23FunctionNextBannerPart10();
        console.log("Próximo banner")
    }

    if (t4ihbf23T1differenceValue < 0 && (t4ihbf23T1differenceValue < t4ihbf23T1minimumSwipeLeft)) {
        t4ihbf23FunctionPrevBannerPart10();
        console.log("Banner anterior")
    }
}

t4ihbf23GetIdPart10.addEventListener('touchstart', e => {
    t4ihbf23T1touchstartX = e.changedTouches[0].screenX
})

t4ihbf23GetIdPart10.addEventListener('touchend', e => {
    t4ihbf23T1touchendX = e.changedTouches[0].screenX
    t4ihbf23T1checkDirection()
})

let t4ihbf23T2touchstartX = 0
let t4ihbf23T2touchendX = 0

var t4ihbf23T2differenceValue = 0;
var t4ihbf23T2minimumSwipeRight = t4ihbf23GetWidhtPart19 / 5;
var t4ihbf23T2minimumSwipeLeft = t4ihbf23T2minimumSwipeRight * -1;
var t4ihbf23GetPart19 = document.getElementById('t4ihbf23ReviewsPart');

function t4ihbf23T2identifyDifference() {
    t4ihbf23T2differenceValue = t4ihbf23T2touchstartX - t4ihbf23T2touchendX;
};

function t4ihbf23T2checkDirection() {

    t4ihbf23T2identifyDifference();

    if (t4ihbf23T2differenceValue > 0 && (t4ihbf23T2differenceValue > t4ihbf23T2minimumSwipeRight)) {
        t4ihbf23RHBNextReview();
    }

    if (t4ihbf23T2differenceValue < 0 && (t4ihbf23T2differenceValue < t4ihbf23T2minimumSwipeLeft)) {
        t4ihbf23RHBPreviousReview();
    }
}

t4ihbf23GetPart19.addEventListener('touchstart', e => {
    t4ihbf23T2touchstartX = e.changedTouches[0].screenX
})

t4ihbf23GetPart19.addEventListener('touchend', e => {
    t4ihbf23T2touchendX = e.changedTouches[0].screenX
    t4ihbf23T2checkDirection()
})



var t4VarMenuBarOp1 = document.getElementById('t4MenuBarOp1');
var t4VarMenuBarOp2 = document.getElementById('t4MenuBarOp2');
var t4VarMenuBarOp3 = document.getElementById('t4MenuBarOp3');
var t4VarMenuBarOp4 = document.getElementById('t4MenuBarOp4');
var t4VarMenuBarOp5 = document.getElementById('t4MenuBarOp5');
var t4VarMenuBarOp6 = document.getElementById('t4MenuBarOp6');
var t4VarMenuBarOp7 = document.getElementById('t4MenuBarOp7');

function t4MenuBarOp1Active() {
    t4VarMenuBarOp1.classList.add('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.remove('t4MenuBarOpActive');
};

function t4MenuBarOp2Active() {
    t4VarMenuBarOp1.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.add('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.remove('t4MenuBarOpActive');
};

function t4MenuBarOp3Active() {
    t4VarMenuBarOp1.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.add('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.remove('t4MenuBarOpActive');
};

function t4MenuBarOp4Active() {
    t4VarMenuBarOp1.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.add('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.remove('t4MenuBarOpActive');
};

function t4MenuBarOp5Active() {
    t4VarMenuBarOp1.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.add('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.remove('t4MenuBarOpActive');
};

function t4MenuBarOp6Active() {
    t4VarMenuBarOp1.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.add('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.remove('t4MenuBarOpActive');
};

function t4MenuBarOp7Active() {
    t4VarMenuBarOp1.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.add('t4MenuBarOpActive');
};

function t4TopoPagina() {
    t4VarMenuBarOp1.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp2.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp3.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp4.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp5.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp6.classList.remove('t4MenuBarOpActive');
    t4VarMenuBarOp7.classList.remove('t4MenuBarOpActive');
};

var t4ihbf23ItemMenu1 = document.getElementById("cadastroBlackFriday").offsetTop;
var t4ihbf23ItemMenu2 = document.getElementById("maisProcurados").offsetTop;
var t4ihbf23ItemMenu3 = document.getElementById("oQueE").offsetTop;
var t4ihbf23ItemMenu4 = document.getElementById("sobreaiPlace").offsetTop;
var t4ihbf23ItemMenu5 = document.getElementById("servicos").offsetTop;
var t4ihbf23ItemMenu6 = document.getElementById("ofertas").offsetTop;
var t4ihbf23ItemMenu7 = document.getElementById("perguntasFrequentes").offsetTop;
var t4ihbf23ItemMenu8 = document.getElementById("topoPagina").offsetTop;

var t4ihbf23ItemMenu6Aux = document.getElementById("dicas").offsetTop;

var t4ihbf23ItemMenu1bottom = t4ihbf23ItemMenu2 - 50;
var t4ihbf23ItemMenu2bottom = t4ihbf23ItemMenu3 - 50;
var t4ihbf23ItemMenu3bottom = t4ihbf23ItemMenu4 - 50;
var t4ihbf23ItemMenu4bottom = t4ihbf23ItemMenu5 - 50;
var t4ihbf23ItemMenu5bottom = t4ihbf23ItemMenu6 - 50;
var t4ihbf23ItemMenu6bottom = t4ihbf23ItemMenu7 - 50;


function t4MenuBar() {
    if (window.scrollY >= t4ihbf23ItemMenu8 && window.scrollY < t4ihbf23ItemMenu1) {
        t4TopoPagina();
    }

    if (window.scrollY >= t4ihbf23ItemMenu1 && window.scrollY < t4ihbf23ItemMenu1bottom) {
        t4MenuBarOp1Active();
    }

    if (window.scrollY >= t4ihbf23ItemMenu2 && window.scrollY < t4ihbf23ItemMenu2bottom) {
        t4MenuBarOp2Active();
    }

    if (window.scrollY >= t4ihbf23ItemMenu3 && window.scrollY < t4ihbf23ItemMenu3bottom) {
        t4MenuBarOp3Active();
    }

    if (window.scrollY >= t4ihbf23ItemMenu4 && window.scrollY < t4ihbf23ItemMenu4bottom) {
        t4MenuBarOp4Active();
    }

    if (window.scrollY >= t4ihbf23ItemMenu5 && window.scrollY < t4ihbf23ItemMenu5bottom) {
        t4MenuBarOp5Active();
    }

    if (window.scrollY >= t4ihbf23ItemMenu6 && window.scrollY < t4ihbf23ItemMenu6Aux) {
        t4MenuBarOp6Active();
    }

    if (window.scrollY >= t4ihbf23ItemMenu6Aux && window.scrollY < t4ihbf23ItemMenu7) {
        t4TopoPagina();
    }

    if (window.scrollY >= t4ihbf23ItemMenu7) {
        t4MenuBarOp7Active();
    }
}

setInterval(function () {
    setInterval(t4MenuBar(), 2000)
})

console.log(t4ihbf23ItemMenu1);
console.log(window.scrollY);

var t4ihbf23Menubar = document.getElementsByClassName('t4-ihbf23-part3-box')[0].clientHeight;

function codigoBrasilTelefone() {
    var t4ihbf23Add55 = document.getElementById('MOBILE_NUMBER_');
    t4ihbf23Add55.value = '55';
}