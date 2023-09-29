var BASE_LK = "1";//1 - новый лк, 0 - старый
var BASE_CAPTCHA = "0"//1 - вкл, 0 - выкл // Капча
var BASE_PASS_RECOVERY = "1"//1 - вкл, 0 - выкл // Восстановление пароля
var BASE_SNILS_OR_FIO = "1"//1 - ФИО, 0 - СНИЛС //Какое поле отображать в регистрации
var BASE_UMI = "0"//1 - Лк для УМИ, 0 - Обычный ЛК //Отличается регистрация
var BASE_LINK_TEXT = "Нет учётной записи? Зарегистрируйтесь"// Текст ссылки при входе(ссылка переход на регистрацию)
var signIn_url = `${document.location.origin}/mobile~account?single=${window.BASE_LK}`;//url
var signUP_url = `${document.location.origin}/web~RegistrationLK/create`;//url для входа регистрации
var ORG_url = `${document.location.origin}/mobile~registration/values?type=inn`;//url для получения списка организаций
var FIO_url = `${document.location.origin}/mobile~registration/values?type=snils`;// url для запроса в поле ФИО(инн сам добавится в коде)

var ChangePassword_url = `${document.location.origin}/web~ChangePasswordLK`//Смена пароля принимает новый пароль
var RestorePassword_url = `${document.location.origin}/web~RestorePasswordLK`// Запрос на отправку письма на почту, с ссылкой на регистрацию нового пароля

var BASE_margin_logo = "29%"//29% и 3%, по стандарту ставим 29 потому что это значение отлажено. но в некоторых случаях понадобвится 3