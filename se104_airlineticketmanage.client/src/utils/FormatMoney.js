const  formatMoney = (money) => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
 }
 
 
 export default formatMoney;