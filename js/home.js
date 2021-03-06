/* const langBtn = document.querySelector(".mnFtr__lang h4");
const mangList = document.querySelector('.mnFtr__langList');

langBtn.addEventListener('click', () =>{
    mangList.classList.toggle('mnFtr__langList--visible')
}) */

//TODO :: Check if card exists

//Open a new page
const checkBtn = document.getElementById('checkAuth__checkBtn');
checkBtn.addEventListener('click', openNewPage);

///////////////////////
//Functions///////////
//////////////////////
//Open a new page to the authenticity certificate
function openNewPage(){
    //Get the input value (The code)
    const code = document.getElementById('checkAuth__input').value;
    let link = window.open("check-authenticity.html");
    link.document.writeln(`
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="short cut icon" href="images/icons/wytgrd-abbr-logo-icon.svg">
    <link rel="stylesheet" href="scss/pages/check-auth.css">
    <title>Comprobar la autenticidad</title>
</head>
    <body>
        <!--NAVIGATION BAR-->
        <nav class="navBar">
            <a href="index.html"><img src="images/others/Willim&Turnergrd-NavBar-logo.svg" alt="Willim&Turnergrd-NavBar-logo"></a>
            <div class="navBar__links">
                <div class="navBar__detailsLinks">
                    <a href="services.html#tarifs">TARIFAS</a>
                    <a href="services.html">SERVICIOS</a>
                </div>
                <div class="navBar__detailsLinks">
                    <a href="submit-card.html" id='navBar__certify'>┬íCERTIFICAR!</a>
                    <a href="register.html" id="navBar__login">LOGIN</a>
                    <a href="myAccount.html" id="navBar__myAccount">MI CUENTA</a>
                    <a href="mailto:info@williamturner-grading.com">CONTACTO</a>
                </div>
            </div>
        </nav>
        <!-- MENU BURGER BTN -->
        <div class="burger">
            <div class="burger__bar"></div>
        </div>
        <!-- MAIN CONTENT -->
        <main id="cerficate">
            <!-- Certificate header -->
            <div class="certificate__header">
                <img src="images/logos/wytgrd-grading-company-logo.svg" alt="wtig-grading-company-logo">
                <h1>Certificado de autenticidad</h1>
            </div>
            <!-- Certificate label -->
            <div class="certificate__label">
                <div class="certificate__label__img"></div>
                <div class="certificate__label__info">
                    <ul>
                        <li>
                            <div>C├│digo de verificaci├│n</div>
                            <div id="certificate__code">7840</div>
                        </li>
                        <li>
                            <div>Nota</div>
                            <div id="certificate__note">
                                8<br>near mint-mint
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- Certificate details -->
            <div class="certificate__details">
                <ul>
                    <li>
                        <span>Juego de cartas</span>
                        <span>Pokemon</span>
                    </li>
                    <li>
                        <span>Nombre del esp├ęcimen</span>
                        <span>Charizard</span>
                    </li>
                    <li>
                        <span>Set</span>
                        <span>Basic</span>
                    </li>
                    <li>
                        <span>Idioma del certificado</span>
                        <span>Ingl├ęs</span>
                    </li>
                    <li>
                        <span>Idioma de la tarjeta</span>
                        <span>Japon├ęs</span>
                    </li>
                </ul>
            </div>
            <!-- Certificate footer -->
            <div class="certificate__footer">
                <div>
                    <div class="title">Fecha</div>
                    <div id="certificate__date">06/06/2022</div>
                </div>
                <div>
                    <div class="title">Presidente</div>
                    <img src="images/others/wtig-president-signature-test.png" alt="wtig-president-signature" id="certificate__signature"></img>
                </div>
            </div>
        </main>
        <!-- CHECK ANOTHER CARD -->
        <div class="check_authenticity">
            <a href="index.html#checkAuth">Comprobar otra tarjeta</a>
            <h3>Gracias por utilizar nuestro sistema de certificaci├│n</h3>
        </div>
        
        <!-- SCRIPTS -->
        <script type="module" src="js/modules/updateNav-ui.js"></script>
        <!--FOOTER-->
        <footer class="mnFtr">
            <div class="mnFtr__container">
                <!--Col01-->
                <div class="mnFtr__links mnFtr__logo">
                    <img src="images/logos/wytgrd-grading-company-logo.svg" alt="wytgrd-grading-company-logo">
                </div>
                <!--Col02-->
                <div class="mnFtr__links">
                    <h4>Ayuda</h4>
                    <ul>
                        <li><a href="services.html">Sobre nostros</a></li>
                        <li><a href="services.html#tarifs">Tarifas</a></li>
                        <li><a href="#">Faq</a></li>
                        <li><a href="mailto:info@williamturner-grading.com">Contactar</a></li>
                    </ul>
                </div>
                <!--Col03-->
                <div class="mnFtr__links">
                    <h4>Mi cuenta</h4>
                    <ul>
                        <li><a href="myAccount.html">Mi cuenta</a></li>
                        <li><a href="myAccount.html">Mis pedidos</a></li>
                    </ul>
                </div>
                <!--Col04-->
                <div class="mnFtr__links">
                    <h4>Servicios</h4>
                    <ul>
                        <li><a href="#">Nuestras garantias</a></li>
                        <li><a href="submit-card.html">Certificar una carta</a></li>
                        <li><a href="index.html#checkAuth">Verificar la autenticidad</a></li>
                    </ul>
                </div>
                <!--Col05-->
                <div class="mnFtr__links">
                    <div class="mnFtr__lang">
                        <h4>Espa├▒ol</h4>
                        <img src="images/icons/wytgrd-dropdown-icon.svg" alt="wytgrd-dropdown-icon">
                    </div>
                    
                    <ul class="mnFtr__langList">
                        <li><a href="#">English</a></li>
                    </ul>
                </div>
            </div>
            <div class="mntFtr__copyright">
                <p>┬ę2022 WYTGRD - Todos los derechos reservados | Aviso legal | Condiciones generales de venta | Politica de privacidad
                </p>
            </div>
        </footer>
    </body>
</html>
    `);

}

