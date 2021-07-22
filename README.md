# Alkemy---Challenge-Full-Stack-Javascript

App para registrar, editar y eliminar operaciones de ingresos y egresos con la finalidad de conocer el balance, la app permite registrar usuarios y filtrar por categorias como por tipo de operación.
La app utiliza una base de datos PostgreSQL por defecto, si quieres utilizar otra deberas cambiar la configuracion en el archivo index.js dentro de la carpeta models en backend.
Se utiliza jwt para protección de rutas, bcrypt para el encriptado, Sequelize como ORM y TailwindCSS como framework CSS, react-modal para ventanas modales y sweetalert para las alertas 

<img src="https://bl3302files.storage.live.com/y4mh_CL1YDis-3-hhhDqX8oUDWNSNFhTl5HRzYdxxNKjP-y2fpFH5Cjf55Hbq9m_z3vrXivRuUmaG4LRv0f3wPjA34o22eTaFKG1h1Rz02chpEL-ZLQqtgg24DY1J7QPAWPj7M76-IHCYJNjn329qC8XtVLmipyC9bntCwSmyzWpCQHzJVVeUHF3zikxhl9zg5I?width=1358&height=569&cropmode=none"/>
(screenshot de pantalla login)

Para que la app funcione se debe crear un archivo .env tanto en la carpeta api(backend) como en client(frontend). En el .env de back se deben crear las siguientes variables con sus respectivos valores segun lo requiera el usario

dbUser=postgres
dbPassword=postgres
dbHost=localhost
dbName=alkemychallenge
PORT=3001
KEY=alkemy

donde dbUser y dbPassword son tu usuario y contraseña respectiva de tu base de datos Postfres, dbHost es el nombre del Host, dbName es el nombre de la base de datos que debes crear manualmente, port es el puerto donde correra tu servidor http y key es la llave que utilizara jwt para proteger la información.

<img src="https://bl3302files.storage.live.com/y4m9-K1AqR67AokyBK3yuxBCaWuccSuDVzDneVt2EGl1ptlWd63BS10LKJt6IrEJHPHWe1cC1UDpjDthBn1Tkm_LQ8c-r3RpZrlA-HcpS52vijCTJTNYusoodhtElKzXtk-rWLj4ee2cojn7Hp-tmqVeD1CzIotnx3Qg-mYkl-W3O7GkC_JPzSMt54TGl50m2L9?width=1341&height=728&cropmode=none"/>
(pantalla home)

<img src="https://bl3302files.storage.live.com/y4mfy1MIXf4pRo3MVM1Rxu0XFOGSqAXoaQy8xlPFms0tBcLBycD7tfJCkVssQSGwZjqiPNHvJ06Bqnm2ws9xh1V2c7tj9p08XHdsDWJzujHRNDfwNDi26wQc5nL9ZeoAR5WFEQl0woHB5O5HxJ5zu8dXctTV2i0Bg4n7D567vCFjCZF-qKdqfxJQ7YAdrd6oal-?width=1337&height=520&cropmode=none"/>
(tocando en una operación se puede editar o eliminar)

En el .env de frontend debes utilizar la siguiente variable 

REACT_APP_BASE_URL=http://localhost:3001

La misma debe ser la direccion de tu servidor http con su respectivo puerto

<img src="https://bl3302files.storage.live.com/y4mvnLU8P9q31hPR1jNjrfi3_5WNEDCDjGcXwjbtp7xMiC7AyC22XJqSujOXumWxA1v3Ga-WuO7lT7_C4Bn0YLk8l2kimJS9Ky4ynT3T-n61BHURiK_IPT-cTZ0z10x7mj6iBTdiC0LfbSYm6kcv2bUPp94stwms58zA7ZEi_FEbkJPGlxxfOEAz_UIQeeRUtSH?width=1342&height=646&cropmode=none"/>
(pantalla crear operación)

IMPORTANTE
**********

En el archivo app.js dentro de la carpeta api(backend) de la línea 54 a la 62 se encuentran comentadas una categorías que podrías utilizar, de no querer utilizarlas deberás insertarlas manualmente en tu base de datos, pero, para el correcto funcionamiento de la app, en la base de datos deberá existir al menos la cetegoría "sin categoria" 

<img src="https://bl3302files.storage.live.com/y4mBqK5iSnGLkSSeHY3ExX-Hnf61G5F5dnTTOjtJlWu5Ct_MOj31iQHv8NcggNTra0U2PzTWglkKBkLAuu3L9xROvUE0WXN65pS7UuM93VIKUwByAeQh7eEGhh85QTLYzj-Ao9H_IS30Iyur2Yr71WjAoChOcHHhm3vVlv7gKDgY1LQ-kscR8qfY7gtENWLn2LG?width=861&height=569&cropmode=none"/>
(pantalla home, categorías)
