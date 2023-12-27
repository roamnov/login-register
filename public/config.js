var BASE_LK = "1";//1 - новый лк, 0 - старый
var BASE_CAPTCHA = "0"//1 - вкл, 0 - выкл // Капча
var BASE_PASS_RECOVERY = "0"//1 - вкл, 0 - выкл // Восстановление пароля
var BASE_SNILS_OR_FIO = "1"//1 - ФИО, 0 - СНИЛС //Какое поле отображать в регистрации
var BASE_UMI = "1"//1 - Лк для УМИ, 0 - Обычный ЛК //Отличается регистрация
var BASE_LINK_TEXT = "Нет учётной записи? Зарегистрируйтесь"// Текст ссылки при входе(ссылка переход на регистрацию)
var signIn_url = `${document.location.origin}/mobile~account?single=${window.BASE_LK}`;//url
var signUP_url = `${document.location.origin}/web~RegistrationLK/create`;//url для входа регистрации
var ORG_url = `${document.location.origin}/mobile~registration/values?type=inn`;//url для получения списка организаций
var FIO_url = `${document.location.origin}/mobile~registration/values?type=snils`;// url для запроса в поле ФИО(инн сам добавится в коде)
var do_esia_auth = "http://stim-srv.krista.ru:8080/esia"//вход через гос услуги, если что то задано, то кнопка отобразиться, и при клике на нее будет перенаправление
var do_esia_org = "https://testlks.budget.gov35.ru/esia?what=esia_org" // адрес для отсылки информации о выборе сотрудником организации из списка возможных
var titleText


var ChangePassword_url = `${document.location.origin}/web~ChangePasswordLK`//Смена пароля принимает новый пароль
var RestorePassword_url = `${document.location.origin}/web~RestorePasswordLK`// Запрос на отправку письма на почту, с ссылкой на регистрацию нового пароля

var BASE_width_logo = "45%";//ширина картинки 45 стандартное
