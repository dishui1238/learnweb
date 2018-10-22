/**
 * Created by Admin on 2018-6-13.
 */
/**
 * 获取制定格式的日期时间
 * @param dt 日期的对象
 * @returns {string} 返回值是字符串的日期时间
 */
//格式化日期和时间————封装成一个函数
function getDate(dt) {
    //var dt=new Date();
    var year=dt.getFullYear();
    var month=dt.getMonth()+1;
    var date=dt.getDate();
    var hour=dt.getHours();
    var min=dt.getMinutes();
    var sec=dt.getSeconds();
    var week=dt.getDay();
    var arr=["日","一","二","三","四","五","六"];
    week=arr[week];
    month=month<10?"0"+month:month;
    date=date<10?"0"+date:date;
    min=min<10?"0"+min:min;
    sec=sec<10?"0"+sec:sec;
    return(year+"年"+month+"月"+date+"日"+"\t"+hour+":"+min+":"+sec+"\t"+"星期"+week);
}
//console.log(getDate());
console.log(getDate(new Date()));//var dt=new Date();