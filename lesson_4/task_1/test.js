/**
 * Магия DOM.
 * Пора попробовать себя в роли иллюзиониста. При клике на кнопку "Телепорт",
 * Джем телепортируется и пропадает из DOM, мячик при этом грустно падает
 * и приобретает class .bouncing. При нажатии на кнопку "Невидимка", Джем остается
 * на месте, но становится невидимой. Мячик остается на её голове.
 * Разрешается добавить id один раз.
 *
 */


function logic()
{
    const buttonTel = document.querySelector('.buttons');
    const buttonInv = document.querySelector('.buttons').nextElementSibling;

    buttonTel.addEventListener("click", function () {
       // document.querySelector('.girl').toggleAttribute('opacity'); ПОЧИТАТЬ

    if(document.querySelector('.girl').style.opacity === '0')
    {document.querySelector('.girl').style.opacity = '1';
        document.getElementById('ball').classList.remove('bouncing');}
    else
    {document.querySelector('.girl').style.opacity = '0';
        document.getElementById('ball').classList.add('bouncing');}
    })


    buttonInv.addEventListener("click", function () {
        document.getElementById('ball').classList.remove('bouncing');

        if(document.querySelector('.girl').style.opacity === '0')
        document.querySelector('.girl').style.opacity = '1';

        else
            document.querySelector('.girl').style.opacity = '0';

    })

}