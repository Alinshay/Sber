import React from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Field } from 'react-final-form'
import Wizard from './Wizard'


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const mustBeNumber = value => (isNaN(value) ? 'Значение должно быть числом' : undefined)

const selectValidate = value => (value === "none" ? 'Выберите значение' : undefined)

const mustBePhone = value => (value.match('^((\\+?7|8)\\d{10})$')? undefined:'Некорректный номер')

const mustBePassport = value => (value.match('\\d{2} \\d{2} \\d{6}')? undefined:'Некорректный номер')

const minValue = min => value =>
    isNaN(value) || value >= min ? undefined : `Значение должно быть больше ${min}`

const maxValue = max => value =>
    isNaN(value) || value <= max ? undefined : `Значение должно быть меньше ${max}`

const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

const required = value => (value ? undefined : 'Заполните поле')


function clearNumber(value = '') {
    return value.replace(/\D+/g, '')
}


const formatExpirationMoney = function(value) {
    let clearValue = clearNumber(value)

        if(clearValue.length>=4) {
            for (let i = 1; i < clearValue.length; i += 4)
                clearValue = `${clearValue.slice(0, i)} ${clearValue.slice(i, clearValue.length)}`;
        }
        return clearValue
}

const formatExpirationPassport= function(value) {
    let clearValue = clearNumber(value)

if(clearValue.length>2)
        clearValue = `${clearValue.slice(0, 2)} ${clearValue.slice(2, clearValue.length)}`;
if(clearValue.length>5)
        clearValue = `${clearValue.slice(0, 5)} ${clearValue.slice(5, 11)}`;

    return clearValue
}



const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>

        {({ input: { value } }) => {
            if(is.indexOf(value)!==-1)
                return children
            else return null}
        }
    </Field>
)



const App = () => (
    <Styles>

        <Wizard
            onSubmit={onSubmit}
            initialValues={{ education: "none", sex: "none", employment: "none", numberOfStuff: "none", position: "none", maritalStatus: "none" }}
        >

            <Wizard.Page>
                <h2>Условия кредита</h2>
                <Field name="loanAmount" validate={composeValidators(required, minValue(30000), maxValue(3000000))} >
                    {({ input, meta }) => (
                        <div>
                            <label>Желаемая сумма</label>
                            <input {...input} type="text" placeholder="₽" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="creditPeriod" validate={composeValidators(required, minValue(3), maxValue(60))}>
                    {({ input, meta }) => (
                        <div>
                            <label>Срок выплаты</label>
                            <input {...input} type="number" placeholder="месяцев" /> <br/>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

            </Wizard.Page>

            <Wizard.Page>
                <h2>Основные данные</h2>
                <Field name="lastName" validate={required}>
                    {({ input, meta }) => (
                        <div>
                            <label>Фамилия</label>
                            <input {...input} type="text"  />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                    <Field name="firstName" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Имя</label>
                                <input {...input} type="text" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>


                    <Field name="middleName" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Отчество</label>
                                <input {...input} type="text" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>


                    <Field
                        name="age"
                        validate={composeValidators(required, mustBeNumber, minValue(21))}
                    >
                        {({ input, meta }) => (
                            <div>
                                <label>Возраст</label>
                                <input {...input} type="text" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>


                    <Field
                        name="phoneNumber"
                        validate={composeValidators(required, mustBePhone)}
                    >
                        {({ input, meta }) => (
                            <div>
                                <label>Мобильный телефон</label>
                                <input {...input} type="text"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>

            </Wizard.Page>
            <Wizard.Page>

                <h2> Персональные данные</h2>

                <Field validate={selectValidate} name="sex">
                    {({ input, meta }) => (
                        <div>
                            <label>Пол</label>
                            <select {...input}  >
                                <option value="none" disabled="disabled"> </option>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>


                <Field name="idNumber" validate={composeValidators(required, mustBePassport)} format={formatExpirationPassport}>
                    {
                        ({ input, meta }) => (
                        <div>
                            <label>Серия и номер</label>
                            <input {...input} type="text" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="idIssued" validate={required}>
                    {({ input, meta }) => (
                        <div>
                            <label>Паспорт выдан</label>
                            <textarea  {...input} />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="placeOfBirth" validate={required}>
                    {({ input, meta }) => (
                        <div>
                            <label>Место рождения</label>
                            <input {...input} type="text" />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Field name="registrationAddress" validate={required}>
                    {({ input, meta }) => (
                        <div>
                            <label>Адрес постоянной регистрации</label>
                            <textarea  {...input}  />
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>


            </Wizard.Page>

            <Wizard.Page>
                <h2>Дополнительная информация </h2>

                <Field validate={selectValidate} name="education">
                    {({ input, meta }) => (
                        <div>
                            <label>Образование</label>
                            <select {...input} >
                                <option value="none" disabled="disabled"> </option>
                                <option value="PhD">Ученая степень/MBA</option>
                                <option value="2higher">Два или более высших образование</option>
                                <option value="higher">Высшее образование</option>
                                <option value="uncompletedHigher">Незаконченное высшее</option>
                                <option value="middle">Среднее специальное</option>
                            </select>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>


                <Field
                    name="income"
                    validate={required}
                    format={formatExpirationMoney}
                >
                    {({ input, meta }) => (
                        <div>
                            <label>Среднемесячный доход</label>
                            <input {...input} type="text" placeholder="₽"/>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>


            </Wizard.Page>

            <Wizard.Page>
                <h2>Трудовая деятельность </h2>
                <Field validate={selectValidate} name="employment">
                    {({ input, meta }) => (
                        <div>
                            <label>Тип занятости</label>
                            <select {...input} >
                                <option value="none" disabled="disabled"> </option>
                                <option value="fixed-term">Срочный контракт</option>
                                <option value="permanent">Постоянная занятость</option>
                                <option value="soleProprietor">Индивидуальный предприниматель</option>
                                <option value="agent">Агент на комиссионном договоре</option>
                                <option value="pensioner">Пенсионер</option>
                            </select>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>

                <Condition when="employment" is={["fixed-term","permanent","soleProprietor","agent"]} >

                    <Field name="nameOfCompany" validate={required}>
                        {({ input, meta }) => (
                            <div>
                                <label>Наименование организации</label>
                                <input {...input} type="text" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>


                    <Field validate={selectValidate} name="numberOfStuff">
                        {({ input, meta }) => (
                            <div>
                                <label>Количество сотрудников</label>
                                <select {...input}  >
                                    <option value="none" disabled="disabled"> </option>
                                    <option value="1-10">До 10</option>
                                    <option value="11-30">11-30</option>
                                    <option value="31-50">31-50</option>
                                    <option value="51-100">51-100</option>
                                    <option value=">100">Более 100</option>
                                    <option value="unknown">Затрудняюсь ответить</option>
                                </select>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>

                    <Field validate={selectValidate} name="position" >
                        {({ input, meta }) => (
                            <div>
                                <label>Категория занимаемой должности</label>
                                <select {...input}  >
                                    <option value="none" disabled="disabled"> </option>
                                    <option value="seniorManager">Руководитель высшего звена</option>
                                    <option value="judge">Судья</option>
                                    <option value="notary">Нотариус</option>
                                    <option value="civilServant">Государственный гражданский служащий</option>
                                    <option value="middleManager">Руководитель среднего звена</option>
                                    <option value="juniorManager">Руководитель начального звена</option>
                                    <option value="businessOwner">Владелец предприятия/главбух</option>
                                    <option value="qualifiedSpecialist">Высококвалифицированный специалист</option>
                                    <option value="specialist">Специалист</option>
                                    <option value="militaryMan">Военнослужащий</option>
                                    <option value="worker">Рабочий</option>
                                </select>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>


                    <Field
                        name="thisCompanyWorkTime"
                        validate={composeValidators(required, mustBeNumber, minValue(0))}
                    >
                        {({ input, meta }) => (
                            <div>
                                <label>Стаж работы на текущем месте</label>
                                <input {...input} type="number" placeholder="лет"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>

                    <Field
                        name="totalWorkTime"
                        validate={composeValidators(required, mustBeNumber, minValue(0))}
                    >
                        {({ input, meta }) => (
                            <div>
                                <label>Общий трудовой стаж</label>
                                <input {...input} type="number" placeholder="лет" />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                    </Field>

                </Condition>
            </Wizard.Page>

            <Wizard.Page>
                <h2>Информация о семье</h2>
                <Field
                    validate={selectValidate}
                    name="maritalStatus"
                >

                    {({ input, meta }) => (
                        <div>
                            <label>Семейное положение</label>
                            <select {...input}  >

                            <option value="none" disabled="disabled"> </option>
                            <option value="single">Не замужем/Не женат</option>
                            <option value="divorced">В разводе</option>
                            <option value="married">Замужем/ Женат</option>
                            <option value="widow/widower">Вдова/Вдовец</option>
                            <option value="civilMarriage">Гражданский брак</option>
                            </select>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                        </div>
                    )}
                </Field>


                    <Field
                        value = "0"
                        validate={composeValidators(required, mustBeNumber, minValue(0))}
                        name="numberOfChildren"
                    >

                        {({ input, meta }) => (
                            <div>
                                <label>Количество детей до 18 лет</label>
                                <input {...input} type="number"  />
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        )}
                </Field>


                <Condition when="maritalStatus" is={["married","civilMarriage"]} >
                    <h2>Информация о супруге </h2>
                                       <Field name="partnersFirstName" validate={required}>
                                           {({ input, meta }) => (
                                               <div>
                                                   <label>Имя</label>
                                                   <input {...input} type="text"  />
                                                   {meta.error && meta.touched && <span>{meta.error}</span>}
                                               </div>
                                           )}
                                       </Field>
                                       <Field name="partnersMiddleName" validate={required}>
                                           {({ input, meta }) => (
                                               <div>
                                                   <label>Фамилия</label>
                                                   <input {...input} type="text"  />
                                                   {meta.error && meta.touched && <span>{meta.error}</span>}
                                               </div>
                                           )}
                                       </Field>

                                       <Field name="partnersLastName" validate={required}>
                                           {({ input, meta }) => (
                                               <div>
                                                   <label>Отчество</label>
                                                   <input {...input} type="text" />
                                                   {meta.error && meta.touched && <span>{meta.error}</span>}
                                               </div>
                                           )}
                                       </Field>

                                       <Field
                                           name="partnersAge"
                                           validate={composeValidators(required, mustBeNumber, minValue(18))}
                                       >
                                           {({ input, meta }) => (
                                               <div>
                                                   <label>Возраст</label>
                                                   <input {...input} type="text" />
                                                   {meta.error && meta.touched && <span>{meta.error}</span>}
                                               </div>
                                           )}
                                       </Field>

                                    <Field name="isPartnersIncome" >
                                        {({input}) => (
                                            <div>
                                                <label> Супруг(а) имеет собственный доход</label>
                                                <input {...input} type="checkbox"/>
                                            </div>
                                        )}
                                    </Field>


                    <Condition when="isPartnersIncome" is = {[true]} >
                        <Field
                            name="partnersIncome"
                            validate={composeValidators(required)}
                            format={formatExpirationMoney}
                        >
                            {({ input, meta }) => (
                                <div>
                                    <label>Доход супруга/супруги</label>
                                    <input {...input} type="text" placeholder="₽"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field>
                    </Condition>

                </Condition>



            </Wizard.Page>
        </Wizard>
    </Styles>
)

render(<App />, document.getElementById('root'))

export default App


/*TODO:
* валидация сервер
*/
