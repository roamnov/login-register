var BASE_LK = "1";//1 - новый лк, 0 - старый
var BASE_CAPTCHA = "0"//1 - вкл, 0 - выкл
var signIn_url = `${document.location.origin}/mobile~account?single=${window.BASE_LK}`;//url для входа
var signUP_url = `${document.location.origin}/mobile~registration/create`;//url для входа регистрации
var ORG_url = `${document.location.origin}/mobile~registration/values?type=inn`;//url для получения списка организаций
var FIO_url = `${document.location.origin}/mobile~registration/values?type=snils`;// url для запроса в поле ФИО(инн сам добавится в коде)
