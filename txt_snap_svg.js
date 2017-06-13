/**
 * Created by liushaojie on 2017/6/13.
 */

var txt = function(props) {
    e('#'+props.fatherID).innerHTML = `<svg id=${props.eleID}></svg>`
    var svg = e(`#${props.eleID}`),
        paper = Snap(`#${props.eleID}`),
        defaultStyle = {
            shadowColor: '#555',
            shadowPosition: ['0.04em', '1.04em'],
            shadowBlur: [1, 1],
            shadowOpacity: 0.5,
            bottomColor: '#fff',
            urlMain: "./img/t10.jpg",
            reflectOpacity: 0,
            rootOpacity: 0,
        },
        styleTypeList = {
            0: {
                shadowOpacity: 0,
                urlMain: './img/t0.jpg',
            },
            1: {
            },
            2: {
                shadowPosition: ['0.0em', '1.0em'],
                shadowBlur: [4, 4], // 这里的 5 指的是 fontSize 的 5% ,详见下面的 shadowF 的定义
                shadowOpacity: 1,
                urlMain: "./img/t11.jpg",
                shadowColor: '#55d',
                reflectOpacity: 1,
            },
            3: {
                shadowPosition: ['0.0em', '1.0em'],
                shadowBlur: [4, 4],
                shadowOpacity: 1,
                urlMain: "./img/t1.jpg",
                shadowColor: '#55d',
                reflectOpacity: 0,
                rootOpacity: 1,
            }
        }


    var style = Object.assign({}, defaultStyle, styleTypeList[props.styleType], props)
    var fontSize = Number(style.fontSize),
        fontFamily = style.fontFamily,
        urlMain = style.urlMain,
        color = style.color
    refY = fontSize * (-1.5);
    rootX = fontSize * (-1.85);
    rootY = fontSize * (2.5);

    var txtShadow = paper.text(...style.shadowPosition, style.content),
        txtReflect = paper.text(0, 0.3*fontSize + refY, style.content),
        txtRoot = paper.text(rootX, fontSize + rootY, style.content),
        txtBottom = paper.text(0, '1em', style.content),
        txtMain = paper.text(0, '1em', style.content),
//        txtReflect = paper.text(0, '-1.15em', style.content),
//        txtRoot = paper.text('-1.85em', '3.5em', style.content),
//        txtBottom = paper.text(0, '1em', style.content),
//        txtMain = paper.text(0, '1em', style.content),
        shadowF = paper.filter(Snap.filter.blur(...style.shadowBlur.map(function(num) {return num * style.fontSize * 0.01}))),
//        rootF = paper.filter(Snap.filter.blur(...style.shadowBlur.map(function(num) {return num * style.fontSize * 0.01}))),
//        shadowF = paper.filter(Snap.filter.shadow(1, 1, 1)),
        url0 = "./img/t0.jpg",
        urlRef = "./img/t11.jpg",
        imgMain = paper.image(urlMain, 0, 0, 1366, 768),
        imgShadow = paper.image(url0, 0, 0, 1366, 768),
        imgBlank = paper.image(url0, 0, 0, 1366, 768),
        imgRoot = paper.image(url0, rootX, rootY, 1366, 768),
        imgReflect = paper.image(urlRef, 0, refY, 1366, 200) // 这些高宽的设置后面会被覆盖

    var mainOptions = {
            class: 'txt-main',
            mask: imgMain,
            fill: color,
            fontSize,
            fontFamily,
        },
        bottomOptions = {
            class: 'txt-bottom',
            mask: imgBlank,
            fill: style.bottomColor,
        },
        shadowOptions = {
            class: 'txt-shadow',
            mask: imgShadow,
            fill: style.shadowColor,
            "fill-opacity": style.shadowOpacity,
            filter: shadowF
        },
        reflectOptions = {
            class: 'txt-reflect',
            mask: imgReflect,
            "fill-opacity": style.reflectOpacity,
        }
    rootOptions = {
        class: 'txt-root',
        mask: imgRoot,
        "fill-opacity": style.rootOpacity,
//        filter: rootF
    }

    var txtOptionsArr = [mainOptions, bottomOptions, reflectOptions, shadowOptions, rootOptions]
    var txtArr = [txtMain, txtBottom, txtReflect, txtShadow, txtRoot]
    txtOptionsArr = txtOptionsArr.map(function(ele) {
        return Object.assign({}, mainOptions, ele)
    })
    txtArr.forEach(function(ele, index) {
        txtArr[index].attr(txtOptionsArr[index])
    })
//    log(txtOptionsArr, txtArr)

    var text = e(`#${props.eleID} text`)
    var imgArr = [imgMain, imgShadow, imgBlank, imgReflect, imgRoot]
    var textHeight = text.style.fontSize.slice(0, -2) * 1.4
    var svgOptions = {
        width: text.clientWidth + 'px',
        height: textHeight * props.lineHeight + 'px',
    }
    var imgOptions = {
        width: text.clientWidth,
        height: textHeight,
    }
//    svg.style.width = '200px'
    svg.style.width = svgOptions.width
    svg.style.height = svgOptions.height
    imgArr.forEach(function(ele) {ele.attr(imgOptions)})
}
var render = function(obj) {
    options = Object.assign({}, InputdefaultOptionsNum1, obj)
    txt(Object.assign({}, options, {fatherID: 'num1', eleID: 'num1-txt', styleType: 0}))
    txt(Object.assign({}, options, {fatherID: 'num2', eleID: 'num2-txt', styleType: 1}))
    txt(Object.assign({}, options, {fatherID: 'num3', eleID: 'num3-txt', styleType: 2}))
    txt(Object.assign({}, options, {fatherID: 'num4', eleID: 'num4-txt', styleType: 3}))
}

var bindAll = function() {
    var ele = e('#num1-input')
    ele.addEventListener('input', function() {
        var obj = {}
        es('#num1-input input').forEach(function(ele) {
            if ('' !== ele.value) {
                obj[ele.name] = ele.value
            }
        })
        render(obj)
    })
}

var svgTest = function() {
    var s = Snap("#svgtest")
    var text = s.text(0, '1em', 'qweasd')
    var imgMain = s.image('./img/t10.jpg', 0, 0, 1366, 768)
    text.attr({mask: imgMain, fill: '#35f'})
}

var inputInit = function(fatherID) {
    var father = e('#'+fatherID)
    var optionsArr = [
        {name: 'content',       defaultValue: "艺术字"},
        {name: 'styleType',     defaultValue: "0"},
        {name: 'color',         defaultValue: "#55d"},
        'br',
        {name: 'fontFamily',    defaultValue: "default", bzvu: 'eg: Times New Roman, Georgia, Serif'},
        'br',
        {name: 'fontSize',      defaultValue: "66"},
        {name: 'lineHeight',    defaultValue: "1.0"},
    ]
    var templateArr = optionsArr.map(function(ele) {
        if(ele === 'br') {
            return `<br>`
        } else {
            var name = ele.name,
                defaultValue = ele.defaultValue,
                bzvu = ele.bzvu
            //language=HTML
            var t = `<span>${name}: </span>
                <input name=${name} type="text" placeholder=${defaultValue}>
                <span>${bzvu || ''}</span>`
            return t
        }
    })
    father.innerHTML += templateArr.join('\n')
    var optionsObj = {}
    optionsArr.forEach(function(ele) {
        if ('br' !== ele) {optionsObj[ele.name] = ele.defaultValue}
    })
    return optionsObj
}

var __main = function() {
    window.InputdefaultOptionsNum1 = inputInit('num1-input')
    render()
    bindAll()
//    svgTest()
}

__main()
