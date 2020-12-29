//const声明以后不能修改赋值,但是是可以intervalList.push()的,
// 用Object.freeze(参数)冻住就不能再push了
const intervalList=Object.freeze([
    {text:"按天",value:"day"},
    {text:"按周",value:"week"},
    {text: "按月",value:"month"}]);

export default intervalList;