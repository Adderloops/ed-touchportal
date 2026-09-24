"""Traducciones al español para docs/es/KEYBINDS.md.

Son traducciones descriptivas: el juego en español puede usar otra redacción.
El nombre interno (inglés) es siempre el exacto.
"""
SECTIONS = {
    'Ship Controls': 'Controles de nave',
    'SRV Controls': 'Controles del VRS (SRV)',
    'General Controls': 'Controles generales',
    'Miscellaneous': 'Varios',
    'Flight Miscellaneous': 'Vuelo: varios',
    'Weapons': 'Armas',
    'Cooling': 'Refrigeración',
    'Targeting': 'Selección de objetivos',
    'Mode Switches': 'Cambios de modo',
    'Interface Mode': 'Modo interfaz',
    'Fighter Orders': 'Órdenes de caza',
    'Free Camera': 'Cámara libre',
    'Camera Suite': 'Suite de cámara',
    'Driving': 'Conducción',
}
MENU = {
    'LandingGearToggle': 'Tren de aterrizaje',
    'ToggleFlightAssist': 'Activar/desactivar asistencia de vuelo',
    'DeployHardpointToggle': 'Desplegar armamento (hardpoints)',
    'ShipSpotLightToggle': 'Luces de la nave',
    'ToggleCargoScoop': 'Recolector de carga',
    'NightVisionToggle': 'Visión nocturna',
    'DeployHeatSink': 'Lanzar disipador de calor',
    'ToggleButtonUpInput': 'Modo silencioso (Silent Running)',
    'EjectAllCargo': 'Expulsar toda la carga',
    'TargetNextRouteSystem': 'Fijar siguiente sistema de la ruta',
    'FocusLeftPanel': 'Panel externo (panel izquierdo)',
    'CyclePreviousPanel': 'Pestaña anterior del panel',
    'CycleNextPanel': 'Pestaña siguiente del panel',
    'UI_Up': 'Panel IU: arriba',
    'UI_Down': 'Panel IU: abajo',
    'UI_Left': 'Panel IU: izquierda',
    'UI_Right': 'Panel IU: derecha',
    'UI_Select': 'Panel IU: seleccionar',
    'CyclePreviousSubsystem': 'Subsistema anterior',
    'WingNavLock': 'Bloqueo de navegación con compañero de ala',
    'OrderRequestDock': 'Llamar al caza (Recall Fighter)',
    'OrderDefensiveBehaviour': 'Defender',
    'OrderAggressiveBehaviour': 'Atacar a discreción',
    'OrderFocusTarget': 'Atacar objetivo',
    'OrderHoldFire': 'Mantener formación',
    'OrderHoldPosition': 'Mantener posición',
    'OrderFollow': 'Sígueme',
    'ToggleFreeCam': 'Activar/desactivar cámara libre',
    'FreeCamZoomIn': 'Acercar zoom',
    'FreeCamZoomOut': 'Alejar zoom',
    'FixCameraWorldToggle': 'Fijar al mundo',
    'RollCameraLeft': 'Alabear a la izquierda',
    'RollCameraRight': 'Alabear a la derecha',
    'MoveFreeCamForward': 'Mover hacia delante',
    'MoveFreeCamBackwards': 'Mover hacia atrás',
    'ToggleAdvanceMode': 'Alternar zoom/desenfoque (modo avanzado)',
    'ToggleRotationLock': 'Bloqueo de rotación (estabilizador)',
    'FixCameraRelativeToggle': 'Fijar a la nave',
    'PhotoCameraToggle': 'Activar/desactivar suite de cámara',
    'AutoBreakBuggyButton': 'Freno de mano',
    'ToggleBuggyTurretButton': 'Modo torreta',
    'ToggleDriveAssist': 'Asistencia de conducción',
    'HeadlightsBuggyButton': 'Faros',
    'BuggyCycleFireGroupNext': 'Siguiente grupo de disparo',
    'FocusLeftPanel_Buggy': 'Panel externo',
    'FocusCommsPanel_Buggy': 'Panel de comunicaciones',
    'FocusRadarPanel_Buggy': 'Panel de rol',
    'FocusRightPanel_Buggy': 'Panel interno',
    'QuickCommsPanel_Buggy': 'Comunicaciones rápidas',
    'RecallDismissShip': 'Llamar / despedir nave',
}
TAB = {'FLIGHT': 'FLIGHT (Vuelo)', 'COMBAT': 'COMBAT (Combate)', 'CAMERA': 'CAMERA (Cámara)', 'SRV': 'SRV'}


def sec_es(sec_en):
    return ' › '.join(SECTIONS.get(p.strip(), p.strip()) for p in sec_en.split('›'))


def keys_es(k):
    return (k.replace('Left Ctrl', 'Ctrl izq.').replace('Right Ctrl', 'Ctrl dcho.')
             .replace('Page Up', 'Re Pág').replace('Page Down', 'Av Pág').replace('Space', 'Espacio')
             .replace('Numpad', 'Teclado num.').replace('key right of L (Ñ on Spanish, ; on US keyboards)',
                                                      'Ñ (en teclado inglés: ;)'))
