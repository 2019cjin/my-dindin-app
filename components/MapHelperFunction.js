function getAddressString(item) {
    return item.name + ", " + 
    item.street+ ", " + 
    item.city + " " + 
    item.region + " " + 
    item.postalCode
  }

function getNextAddr(list, index){
    newIndex = (index) % list.length
    return list[newIndex].name + ", " + 
        list[newIndex].street+ ", " + 
        list[newIndex].city + " " + 
        list[newIndex].region + " " + 
        list[newIndex].postalCode
}

export { getAddressString, getNextAddr }
