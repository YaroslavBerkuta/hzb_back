interface IParams {
	linkToWeb: string
	phoneNumber: string
	login: string
	password: string
}
export const getChangePasswordNotificationHTML = (params: IParams) => {
	return `
    <div id=":np" class="a3s aiL "><div class="adM">
        </div><p><strong>Десктоп версія:</strong></p>
        <p>Сайт: <a href="${params.linkToWeb}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${params.linkToWeb}&amp;source=gmail&amp;ust=1638284329801000&amp;usg=AOvVaw0ET0qmDW6lJLJqvrGjQTxA">${params.linkToWeb}</a></p>
        <p>Логін: ${params.login}</p>
        <p>Пароль: ${params.password}</p>
        <br>
        <p><strong>Мобільний додаток:</strong></p>
        <p>Тел: ${params.phoneNumber}</p>
        <br>
        <p>
          <strong>Завантажити додаток</strong> з AppStore <a href="https://apps.apple.com/gb/app/task-me/id1482240685?l=ru" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://apps.apple.com/gb/app/task-me/id1482240685?l%3Dru&amp;source=gmail&amp;ust=1638284329801000&amp;usg=AOvVaw0AL16yRiqavZyrABgr1-5q">https://apps.apple.com/gb/app/<wbr>task-me/id1482240685?l=ru</a>, або завантажити з Google Play Market <a href="https://play.google.com/store/apps/details?id=com.app.task_me&amp;hl=ru" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://play.google.com/store/apps/details?id%3Dcom.app.task_me%26hl%3Dru&amp;source=gmail&amp;ust=1638284329801000&amp;usg=AOvVaw1sy2Sg9VPGh_tWIJ3FaBBF">https://play.google.com/store/<wbr>apps/details?id=com.app.task_<wbr>me&amp;hl=ru</a>
        </p><div class="yj6qo"></div><div class="adL">
      

        </div>
    </div>
`
}

export const getChangePasswordNotificationText = (params: IParams) => {
	return `
    Дані для входу в програму Task Me ;) \n
    Десктоп версія:  \n \n
    Логін: ${params.login} \n
    Пароль: ${params.password} \n 
    Тел: ${params.phoneNumber} \n 
    Завантажити додатоку з App Store https://apps.apple.com/gb/app/task-me/id1482240685?l=ru \n
    Завантажити додаток з Google Play Market https://play.google.com/store/apps/details?id=com.app.task_me&amp;hl=ru 
  `
}
