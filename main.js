
// インプレッション回数アップデート
function updateImpCount(sectionName) {
    console.log(sectionName);
}

function isShow(section) {
    $target = $(section.selector);
    var height = $target.offset().top;
    var scroll = $(window).scrollTop();
    if(scroll > height){
        return true;
    }else{
        return false;
    }
}

// Strage側の処理
function createStrage(sectionName) {
    console.log('createStrage');
    return{
        sectionName,
        updateImpCount: () => {
            updateImpCount(sectionName);
        }
    }
}

// View側の処理
function createView(selector, sectionName) {
    console.log('createView');
    return{
        selector,
        isShow : function() {
            return isShow(this);
        }
    }
}

sections = [
    {selector: '.aaa', section: 'AAA'},
    {selector: '.bbb', section: 'BBB'},
    {selector: '.ccc', section: 'CCC'}
]

sectionList = []
for (section of sections) {
    sectionList.push({view: createView(section.selector, section.section), strage: createStrage(section.section)});
}

// sectionList = [
//     {view: createView('.aaa', 'AAA'), strage: createStrage('AAA')},
//     {view: createView('.bbb', 'BBB'), strage: createStrage('BBB')},
//     {view: createView('.ccc', 'CCC'), strage: createStrage('CCC')},
// ]
console.log(sectionList);
$(window).on('scroll', function () {
    for (section of sectionList) {
        if(section.view.isShow()){
            section.strage.updateImpCount();
        }
    }
});