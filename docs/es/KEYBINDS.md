# Guía de asignación de teclas (keybinds)

*[English version](../KEYBINDS.md)*

**Léela antes de jugar.** Hasta que no la sigas, algunos botones de la tablet no harán nada en el juego.

---

## 1. Por qué hace falta esto

Elite Dangerous no deja que otros programas controlen la nave directamente. Por eso, cuando pulsas un botón como **LANDING GEAR** en la tablet, Touch Portal **escribe una combinación de teclas en el teclado de tu PC, como si la pulsaras tú**. Ese botón, por ejemplo, envía `Ctrl izq. + G`.

El juego solo reacciona si **esa combinación exacta** está asignada a *esa* acción en *tus* controles.

Los botones se configuraron con las teclas del autor. Lo más probable es que las tuyas sean distintas, así que algunos botones no harán nada y otros incluso podrían activar una acción diferente.

Se arregla **una sola vez**, de una de estas dos formas:

| | Opción A: cambiar el juego | Opción B: cambiar Touch Portal |
|---|---|---|
| **Qué haces** | En Elite, asignas a cada acción la tecla que envía el botón | En Touch Portal, cambias la tecla de cada botón por la que ya usas en el juego |
| **Recomendada para** | Jugadores nuevos y quien no use todavía esas teclas | Quien ya tiene teclas para esas acciones y quiere conservarlas |
| **Tu HOTAS / mando** | No se toca, si usas la **segunda** columna (ver más abajo) | No se toca |
| **¿Recomendada?** | ✅ Sí, para la mayoría | ✅ Sí, si las teclas chocan con las que ya usas |

Puedes combinar las dos, botón a botón.

> ❌ **No copies el fichero `.binds` del autor en tu juego.** Sustituiría **toda** tu configuración de controles, incluidos joystick, HOTAS y mando, por la de otra persona con otro hardware.

---

## 2. ¿Qué botones lo necesitan?

Solo **50 botones en 4 páginas** envían teclas. Todo lo demás funciona sin configurar nada: muestra datos en vivo del juego o abre aplicaciones y webs.

| Página (pestaña) | Botones que envían teclas |
|---|---|
| **FLIGHT** | Los 6 interruptores (tren, FA off, hardpoints, luces, recolector de carga, visión nocturna) y los 5 botones naranjas de acción |
| **COMBAT** | Target Power Plant, Team Mate Nav Lock, Request Docking y las 7 órdenes de caza |
| **CAMERA** | Los 12 botones de cámara |
| **SRV** | Handbrake, Turret View, Drive Assist, High Beams y todos los botones naranjas |

Las casillas de estado de esas páginas (DOCKED, SHIELDS, IN SRV…) **no** necesitan teclas. Se iluminan solas.

---

## 3. Antes de empezar

1. **La ventana del juego tiene que estar activa.** Touch Portal escribe en la ventana que esté delante. Si acabas de hacer clic en Discord o en el navegador, las teclas irán ahí. Después de usar otra aplicación, haz un clic en el juego.
2. **Ctrl izquierdo y Ctrl derecho son teclas distintas.** Elite las trata por separado. Los botones de vuelo usan casi siempre **Ctrl izquierdo**, y los de cámara y SRV, **Ctrl derecho**. Asigna exactamente lo que dice la tabla.
3. **Distribución del teclado.** Elite nombra las teclas según su posición en un **teclado estadounidense**. Esto afecta a dos botones:
   - **TARGET POWER PLANT** pulsa la tecla que está a la derecha de la `L`. Es la `Ñ` en un teclado español, `;` en uno inglés y `Ö` en uno alemán. Elite la llama `;` (SemiColon).
   - **TEAM MATE NAV LOCK** pulsa la tecla `/` (Elite: Slash). En teclados no estadounidenses está en otro sitio.

   Si alguno de los dos no funciona, usa la **opción B** y graba la tecla de nuevo con tu propio teclado (sección 5).
4. **Mantener o alternar.** Cada botón pulsa su tecla durante 0,1 segundos. Si una acción está en modo **Mantener (Hold)** en las opciones del juego (puede pasar con la asistencia de vuelo o el modo silencioso), esa pulsación corta no se queda. Ponla en **Alternar (Toggle)**.
5. **Teclado numérico:** activa **Bloq Num** para los botones de órdenes de caza.

---

## 4. Opción A: asignar las teclas en Elite Dangerous

### 4.1 Dónde

1. Arranca Elite Dangerous y abre **Opciones → Controles**.
2. Arriba, mira qué **preset** tienes seleccionado. Si es uno de fábrica (por ejemplo *Teclado y ratón* o *Saitek X56*), el juego crea una copia llamada **Custom** en cuanto cambias algo. Es normal.
3. Los controles están agrupados en secciones: **Controles de nave**, **Controles del VRS (SRV)**, **Controles generales**, etc., cada una con subsecciones. Las tablas de abajo dicen dónde está cada opción.

> **Sobre los nombres:** las guías indican los nombres de las opciones en español como traducción orientativa, porque el juego puede usar otra redacción. Si juegas en inglés, tienes los nombres ingleses en la [versión inglesa](../KEYBINDS.md). El **nombre interno** de la última columna es siempre el exacto.

### 4.2 Cómo asignar una acción

Cada acción tiene **dos huecos**: *Principal* y *Secundario*.

1. Busca la opción (por ejemplo *Controles de nave → Varios → Tren de aterrizaje*).
2. Haz clic en el **hueco que esté vacío**, mejor el **Secundario**. Así no tocas el botón que ya tengas en el joystick, que suele estar en el Principal.
3. Cuando aparezca *"Pulsa una tecla…"*, pulsa **en tu teclado** la combinación de la tabla. Para `Ctrl izq. + G`: mantén el Ctrl izquierdo y toca la G.
4. Comprueba que el hueco muestra ahora la combinación.
5. Al terminar, haz clic en **Aplicar**, abajo del todo. Si no, no se guarda nada.

> Si el juego avisa de que la tecla **ya está en uso** en otra acción, decide cuál prefieres. Si quieres conservar tu tecla, usa la opción B para ese botón.

> **Consejo:** la web gratuita [EDRefCard](https://edrefcard.info) muestra tus asignaciones actuales como una imagen que se puede imprimir. Es una forma fácil de ver lo que ya tienes antes de empezar.

### 4.3 Lista de comprobación, agrupada por sección del menú

Recórrela sección a sección en el menú del juego y marca cada línea al terminarla. Todas las filas las necesita al menos un botón.

**Controles de nave › Refrigeración**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Lanzar disipador de calor | `Ctrl izq. + H` | FLIGHT › HEAT SINK |
| ☐ | Modo silencioso (Silent Running) | `Ctrl izq. + S` | FLIGHT › SILENT RUNNING |

**Controles de nave › Órdenes de caza**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Llamar al caza (Recall Fighter) | `Teclado num. 0` | COMBAT › RECALL FIGHTER |
| ☐ | Defender | `Teclado num. 1` | COMBAT › DEFEND |
| ☐ | Atacar a discreción | `Teclado num. 2` | COMBAT › ENGAGE AT WILL |
| ☐ | Atacar objetivo | `Teclado num. 3` | COMBAT › ATTACK TARGET |
| ☐ | Mantener formación | `Teclado num. 4` | COMBAT › MAINTAIN FORMATION |
| ☐ | Mantener posición | `Teclado num. 5` | COMBAT › HOLD POSITION |
| ☐ | Sígueme | `Teclado num. 6` | COMBAT › FOLLOW ME |

**Controles de nave › Vuelo: varios**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Activar/desactivar asistencia de vuelo | `Ctrl izq. + Z` | FLIGHT › FA OFF |

**Controles de nave › Varios**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Tren de aterrizaje | `Ctrl izq. + G` | FLIGHT › LANDING GEAR |
| ☐ | Luces de la nave | `Ctrl izq. + L` | FLIGHT › LIGHTS |
| ☐ | Recolector de carga | `Ctrl izq. + C` | FLIGHT › CARGO SCOOP |
| ☐ | Visión nocturna | `Ctrl izq. + N` | FLIGHT › NIGHT VISION |
| ☐ | Expulsar toda la carga | `Ctrl izq. + J` | FLIGHT › JETTISON ALL CARGO |

**Controles de nave › Cambios de modo**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Panel externo (panel izquierdo) | `Ctrl izq. + E` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING |

**Controles de nave › Selección de objetivos**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Fijar siguiente sistema de la ruta | `Ctrl dcho. + N` | FLIGHT › TARGET NEXT SYSTEM |
| ☐ | Subsistema anterior | `Ñ (en teclado inglés: ;)` | COMBAT › TARGET POWER PLANT |
| ☐ | Bloqueo de navegación con compañero de ala | `/` | COMBAT › TEAM MATE NAV LOCK |

**Controles de nave › Armas**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Desplegar armamento (hardpoints) | `Ctrl izq. + U` | FLIGHT › HARDPOINTS |

**Controles del VRS (SRV) › Conducción**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Freno de mano | `Ctrl dcho. + F` | SRV › HANDBRAKE |
| ☐ | Asistencia de conducción | `Ctrl dcho. + D` | SRV › DRIVE ASSIST |

**Controles del VRS (SRV) › Varios**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Faros | `Ctrl dcho. + L` | SRV › HIGH BEAMS |
| ☐ | Llamar / despedir nave | `Ctrl dcho. + R` | SRV › RECALL SHIP |

**Controles del VRS (SRV) › Cambios de modo**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Modo torreta | `Ctrl dcho. + T` | SRV › TURRET VIEW |
| ☐ | Panel externo | `1` | SRV › EXTERNAL PANEL |
| ☐ | Panel de comunicaciones | `2` | SRV › COMMS PANEL |
| ☐ | Panel de rol | `3` | SRV › ROLE PANEL |
| ☐ | Panel interno | `4` | SRV › INTERNAL PANEL |
| ☐ | Comunicaciones rápidas | `Enter` | SRV › QUICK COMMS |

**Controles del VRS (SRV) › Armas**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Siguiente grupo de disparo | `N` | SRV › NEXT GROUP |

**Controles generales › Suite de cámara**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Activar/desactivar suite de cámara | `Ctrl dcho. + P` | CAMERA › PHOTO MODE |

**Controles generales › Cámara libre**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Activar/desactivar cámara libre | `Ctrl dcho. + K` | CAMERA › FREE CAMERA ON / OFF |
| ☐ | Acercar zoom | `Ctrl dcho. + O` | CAMERA › ZOOM + |
| ☐ | Alejar zoom | `Ctrl dcho. + V` | CAMERA › ZOOM - |
| ☐ | Fijar al mundo | `Ctrl dcho. + Y` | CAMERA › LOCK |
| ☐ | Alabear a la izquierda | `Ctrl dcho. + Q` | CAMERA › ROLL LEFT |
| ☐ | Alabear a la derecha | `Ctrl dcho. + E` | CAMERA › ROLL RIGHT |
| ☐ | Mover hacia delante | `Ctrl dcho. + W` | CAMERA › MOVE FORWARD |
| ☐ | Mover hacia atrás | `Ctrl dcho. + X` | CAMERA › MOVE BACK |
| ☐ | Alternar zoom/desenfoque (modo avanzado) | `Ctrl dcho. + A` | CAMERA › ZOOM / BLUR TOGGLE |
| ☐ | Bloqueo de rotación (estabilizador) | `Ctrl dcho. + S` | CAMERA › STABILISER OFF |
| ☐ | Fijar a la nave | `Ctrl dcho. + I` | CAMERA › SHIP CONTROLS |

**Controles generales › Modo interfaz**

| ☐ | Opción | Asignar a | La usa |
|---|---|---|---|
| ☐ | Pestaña anterior del panel | `Re Pág` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING, SRV › PREVIOUS PAGE |
| ☐ | Panel IU: derecha | `D` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING, SRV › RIGHT |
| ☐ | Panel IU: seleccionar | `Espacio` | COMBAT › REQUEST DOCKING, FLIGHT › REQUEST DOCKING |
| ☐ | Panel IU: arriba | `W` | SRV › UP |
| ☐ | Pestaña siguiente del panel | `Av Pág` | SRV › NEXT PAGE |
| ☐ | Panel IU: izquierda | `A` | SRV › LEFT |
| ☐ | Panel IU: abajo | `S` | SRV › DOWN |

---

## 5. Opción B: cambiar la tecla que envía un botón en Touch Portal

Se hace en el **PC**, en la aplicación de escritorio de Touch Portal. No en la tablet.

1. Abre Touch Portal y ve a la página. Por ahora los ficheros de página se llaman en español: **ED - Vuelo** = FLIGHT, **ED - Combate** = COMBAT, **ED - Cámara** = CAMERA, **ED - SRV** = SRV.
2. **Haz clic en el botón** que quieras cambiar. Se abre el editor del botón.
3. En la pestaña **On Pressed** verás la lista de acciones del botón. Busca la acción de teclado; muestra las teclas, por ejemplo **Left Ctrl + G**.
4. Haz clic en el campo de teclas y **pulsa la combinación que usas en el juego**. Touch Portal la graba.
   - Si hay una opción para borrar, borra antes las teclas antiguas para no acabar con las dos.
5. Pulsa **Save** y pruébalo en la tablet. Si la tablet sigue haciendo lo de antes, reconéctala.

**No cambies nada más del botón** (colores, eventos, otras acciones). El color de estado de cada botón lo controla el plugin y sigue funcionando aunque cambies la tecla.

### Botones que pulsan varias teclas (macros)

Dos botones hacen más de una cosa. Para cambiarlos, edita **cada** acción de teclado de la lista y **conserva las esperas** entre ellas.

**REQUEST DOCKING** (FLIGHT y COMBAT) recorre los menús por ti:

| Paso | Teclas | Qué pasa en el juego |
|---|---|---|
| 1 | `Ctrl izq. + E` | Abre el panel izquierdo (externo) |
| – | espera 0,1 s | |
| 2 | `Re Pág` | Pestaña anterior |
| – | espera 0,1 s | |
| 3 | `Re Pág` | Otra pestaña atrás → **Contactos** |
| – | espera 0,1 s | |
| 4 | `D` | Se mueve a la derecha, al botón **Solicitar atraque** |
| – | espera 0,2 s | |
| 5 | `Espacio` | Lo pulsa |

Está ajustado a la partida del autor: el panel izquierdo se abre en su pestaña por defecto y tú estás dentro del alcance de atraque de la estación (7,5 km). Si se queda a medias, sube las esperas a 0,3 s, porque en un PC más lento el menú puede tardar más en abrirse. Si acaba en la pestaña equivocada, añade o quita un paso `Re Pág`.

**TARGET POWER PLANT** (COMBAT) pulsa **Subsistema anterior** 6 veces seguidas (*Repeat 6 times* en la lista de acciones). Primero necesitas tener una nave fijada como objetivo. Cambia solo la tecla que hay dentro de la repetición y deja como están las acciones *Repeat* y *End repeat*.

---

## 6. Referencia completa: todos los botones, uno a uno

Esto es lo que envía cada botón, en el orden en que aparecen en la tablet. Los mismos datos están en [`keybinds.csv`](../keybinds.csv) (en inglés), que puedes abrir con Excel o Google Sheets.

### Página FLIGHT (Vuelo)

| Botón en la tablet | Teclas que envía | Acción en el juego: *sección › opción* | Nombre interno |
|---|---|---|---|
| LANDING GEAR | `Ctrl izq. + G` | Controles de nave › Varios › **Tren de aterrizaje** | `LandingGearToggle` |
| FA OFF | `Ctrl izq. + Z` | Controles de nave › Vuelo: varios › **Activar/desactivar asistencia de vuelo** | `ToggleFlightAssist` |
| HARDPOINTS | `Ctrl izq. + U` | Controles de nave › Armas › **Desplegar armamento (hardpoints)** | `DeployHardpointToggle` |
| LIGHTS | `Ctrl izq. + L` | Controles de nave › Varios › **Luces de la nave** | `ShipSpotLightToggle` |
| CARGO SCOOP | `Ctrl izq. + C` | Controles de nave › Varios › **Recolector de carga** | `ToggleCargoScoop` |
| NIGHT VISION | `Ctrl izq. + N` | Controles de nave › Varios › **Visión nocturna** | `NightVisionToggle` |
| HEAT SINK | `Ctrl izq. + H` | Controles de nave › Refrigeración › **Lanzar disipador de calor** | `DeployHeatSink` |
| SILENT RUNNING | `Ctrl izq. + S` | Controles de nave › Refrigeración › **Modo silencioso (Silent Running)** | `ToggleButtonUpInput` |
| JETTISON ALL CARGO | `Ctrl izq. + J` | Controles de nave › Varios › **Expulsar toda la carga** | `EjectAllCargo` |
| TARGET NEXT SYSTEM | `Ctrl dcho. + N` | Controles de nave › Selección de objetivos › **Fijar siguiente sistema de la ruta** | `TargetNextRouteSystem` |
| REQUEST DOCKING, paso 1 | `Ctrl izq. + E` | Controles de nave › Cambios de modo › **Panel externo (panel izquierdo)** | `FocusLeftPanel` |
| REQUEST DOCKING, paso 2 | `Re Pág` | Controles generales › Modo interfaz › **Pestaña anterior del panel** | `CyclePreviousPanel` |
| REQUEST DOCKING, paso 3 | `Re Pág` | Controles generales › Modo interfaz › **Pestaña anterior del panel** | `CyclePreviousPanel` |
| REQUEST DOCKING, paso 4 | `D` | Controles generales › Modo interfaz › **Panel IU: derecha** | `UI_Right` |
| REQUEST DOCKING, paso 5 | `Espacio` | Controles generales › Modo interfaz › **Panel IU: seleccionar** | `UI_Select` |

### Página COMBAT (Combate)

| Botón en la tablet | Teclas que envía | Acción en el juego: *sección › opción* | Nombre interno |
|---|---|---|---|
| TARGET POWER PLANT | `Ñ (en teclado inglés: ;)` ×6 | Controles de nave › Selección de objetivos › **Subsistema anterior** | `CyclePreviousSubsystem` |
| TEAM MATE NAV LOCK | `/` | Controles de nave › Selección de objetivos › **Bloqueo de navegación con compañero de ala** | `WingNavLock` |
| REQUEST DOCKING, paso 1 | `Ctrl izq. + E` | Controles de nave › Cambios de modo › **Panel externo (panel izquierdo)** | `FocusLeftPanel` |
| REQUEST DOCKING, paso 2 | `Re Pág` | Controles generales › Modo interfaz › **Pestaña anterior del panel** | `CyclePreviousPanel` |
| REQUEST DOCKING, paso 3 | `Re Pág` | Controles generales › Modo interfaz › **Pestaña anterior del panel** | `CyclePreviousPanel` |
| REQUEST DOCKING, paso 4 | `D` | Controles generales › Modo interfaz › **Panel IU: derecha** | `UI_Right` |
| REQUEST DOCKING, paso 5 | `Espacio` | Controles generales › Modo interfaz › **Panel IU: seleccionar** | `UI_Select` |
| RECALL FIGHTER | `Teclado num. 0` | Controles de nave › Órdenes de caza › **Llamar al caza (Recall Fighter)** | `OrderRequestDock` |
| DEFEND | `Teclado num. 1` | Controles de nave › Órdenes de caza › **Defender** | `OrderDefensiveBehaviour` |
| ENGAGE AT WILL | `Teclado num. 2` | Controles de nave › Órdenes de caza › **Atacar a discreción** | `OrderAggressiveBehaviour` |
| ATTACK TARGET | `Teclado num. 3` | Controles de nave › Órdenes de caza › **Atacar objetivo** | `OrderFocusTarget` |
| MAINTAIN FORMATION | `Teclado num. 4` | Controles de nave › Órdenes de caza › **Mantener formación** | `OrderHoldFire` |
| HOLD POSITION | `Teclado num. 5` | Controles de nave › Órdenes de caza › **Mantener posición** | `OrderHoldPosition` |
| FOLLOW ME | `Teclado num. 6` | Controles de nave › Órdenes de caza › **Sígueme** | `OrderFollow` |

### Página CAMERA (Cámara)

| Botón en la tablet | Teclas que envía | Acción en el juego: *sección › opción* | Nombre interno |
|---|---|---|---|
| FREE CAMERA ON / OFF | `Ctrl dcho. + K` | Controles generales › Cámara libre › **Activar/desactivar cámara libre** | `ToggleFreeCam` |
| ZOOM + | `Ctrl dcho. + O` | Controles generales › Cámara libre › **Acercar zoom** | `FreeCamZoomIn` |
| ZOOM - | `Ctrl dcho. + V` | Controles generales › Cámara libre › **Alejar zoom** | `FreeCamZoomOut` |
| LOCK | `Ctrl dcho. + Y` | Controles generales › Cámara libre › **Fijar al mundo** | `FixCameraWorldToggle` |
| ROLL LEFT | `Ctrl dcho. + Q` | Controles generales › Cámara libre › **Alabear a la izquierda** | `RollCameraLeft` |
| ROLL RIGHT | `Ctrl dcho. + E` | Controles generales › Cámara libre › **Alabear a la derecha** | `RollCameraRight` |
| MOVE FORWARD | `Ctrl dcho. + W` | Controles generales › Cámara libre › **Mover hacia delante** | `MoveFreeCamForward` |
| MOVE BACK | `Ctrl dcho. + X` | Controles generales › Cámara libre › **Mover hacia atrás** | `MoveFreeCamBackwards` |
| ZOOM / BLUR TOGGLE | `Ctrl dcho. + A` | Controles generales › Cámara libre › **Alternar zoom/desenfoque (modo avanzado)** | `ToggleAdvanceMode` |
| STABILISER OFF | `Ctrl dcho. + S` | Controles generales › Cámara libre › **Bloqueo de rotación (estabilizador)** | `ToggleRotationLock` |
| SHIP CONTROLS | `Ctrl dcho. + I` | Controles generales › Cámara libre › **Fijar a la nave** | `FixCameraRelativeToggle` |
| PHOTO MODE | `Ctrl dcho. + P` | Controles generales › Suite de cámara › **Activar/desactivar suite de cámara** | `PhotoCameraToggle` |

### Página SRV

| Botón en la tablet | Teclas que envía | Acción en el juego: *sección › opción* | Nombre interno |
|---|---|---|---|
| HANDBRAKE | `Ctrl dcho. + F` | Controles del VRS (SRV) › Conducción › **Freno de mano** | `AutoBreakBuggyButton` |
| TURRET VIEW | `Ctrl dcho. + T` | Controles del VRS (SRV) › Cambios de modo › **Modo torreta** | `ToggleBuggyTurretButton` |
| DRIVE ASSIST | `Ctrl dcho. + D` | Controles del VRS (SRV) › Conducción › **Asistencia de conducción** | `ToggleDriveAssist` |
| HIGH BEAMS | `Ctrl dcho. + L` | Controles del VRS (SRV) › Varios › **Faros** | `HeadlightsBuggyButton` |
| NEXT GROUP | `N` | Controles del VRS (SRV) › Armas › **Siguiente grupo de disparo** | `BuggyCycleFireGroupNext` |
| EXTERNAL PANEL | `1` | Controles del VRS (SRV) › Cambios de modo › **Panel externo** | `FocusLeftPanel_Buggy` |
| COMMS PANEL | `2` | Controles del VRS (SRV) › Cambios de modo › **Panel de comunicaciones** | `FocusCommsPanel_Buggy` |
| ROLE PANEL | `3` | Controles del VRS (SRV) › Cambios de modo › **Panel de rol** | `FocusRadarPanel_Buggy` |
| INTERNAL PANEL | `4` | Controles del VRS (SRV) › Cambios de modo › **Panel interno** | `FocusRightPanel_Buggy` |
| QUICK COMMS | `Enter` | Controles del VRS (SRV) › Cambios de modo › **Comunicaciones rápidas** | `QuickCommsPanel_Buggy` |
| PREVIOUS PAGE | `Re Pág` | Controles generales › Modo interfaz › **Pestaña anterior del panel** | `CyclePreviousPanel` |
| UP | `W` | Controles generales › Modo interfaz › **Panel IU: arriba** | `UI_Up` |
| NEXT PAGE | `Av Pág` | Controles generales › Modo interfaz › **Pestaña siguiente del panel** | `CycleNextPanel` |
| RECALL SHIP | `Ctrl dcho. + R` | Controles del VRS (SRV) › Varios › **Llamar / despedir nave** | `RecallDismissShip` |
| LEFT | `A` | Controles generales › Modo interfaz › **Panel IU: izquierda** | `UI_Left` |
| DOWN | `S` | Controles generales › Modo interfaz › **Panel IU: abajo** | `UI_Down` |
| RIGHT | `D` | Controles generales › Modo interfaz › **Panel IU: derecha** | `UI_Right` |

> El **nombre interno** es exactamente lo que aparece en tu fichero de controles (`%LOCALAPPDATA%\Frontier Developments\Elite Dangerous\Options\Bindings\*.binds`). Si no encuentras una opción en el menú, puedes buscarla ahí.

---

## 7. Solución de problemas

| Problema | Qué revisar |
|---|---|
| Un botón no hace nada | ¿El juego es la ventana activa (sección 3, punto 1)? ¿La tecla está asignada en el juego, en la sección correcta? ¿Ctrl izquierdo o derecho? |
| Un botón hace **otra** cosa | Esa tecla ya la usa otra acción en tu configuración. Reasigna una de las dos (opción A) o cambia el botón (opción B). |
| Con el teclado funciona pero desde la tablet no | Comprueba que la acción no esté en modo **Mantener** en el juego y que Bloq Num esté activado (órdenes de caza). Ejecuta Touch Portal y el juego los dos como usuario normal, o los dos como administrador: Windows bloquea las teclas simuladas que van *hacia* una aplicación con más permisos. |
| TARGET POWER PLANT / TEAM MATE NAV LOCK no funcionan | Distribución del teclado (sección 3, punto 3). Graba la tecla de nuevo con la opción B. |
| REQUEST DOCKING se queda a medias | Sube las esperas entre pasos (sección 5) y comprueba que tienes asignadas Pestaña anterior, Panel IU: derecha y Panel IU: seleccionar. |
| Los botones de cámara no hacen nada | La mayoría solo funcionan con la cámara libre activada. Pulsa primero **FREE CAMERA ON / OFF**. |
