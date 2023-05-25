var BASE_LK = "1";//1 - новый лк, 0 - старый
var BASE_CAPTCHA = "0"//1 - вкл, 0 - выкл // Капча
var BASE_PASS_RECOVERY = "0"//1 - вкл, 0 - выкл // Восстановление пароля
var BASE_SNILS_OR_FIO = "0"//1 - ФИО, 0 - СНИЛС //Какое поле отображать в регистрации
var BASE_UMI = "0"//1 - Лк для УМИ, 0 - Обычный ЛК //Отличается регистрация
var signIn_url = `${document.location.origin}/mobile~account?single=${window.BASE_LK}`;//url для входа
var signUP_url = `${document.location.origin}/mobile~registration/create`;//url для входа регистрации
var ORG_url = `${document.location.origin}/mobile~registration/values?type=inn`;//url для получения списка организаций
var FIO_url = `${document.location.origin}/mobile~registration/values?type=snils`;// url для запроса в поле ФИО(инн сам добавится в коде)

var ChangePassword_url = `${document.location.origin}/mobile~services/ChangePasswordLK`// Смена пароля принимает новый пароль
var RestorePassword_url = `${document.location.origin}/mobile~services/RestorePassword`// Запрос на отправку письма на почту, с ссылкой на регистрацию нового пароля
