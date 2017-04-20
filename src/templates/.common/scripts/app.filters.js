window.app.filter('translate', function () {
    var lang = 'es';
    var dictionary = {
        'code': { 'es': 'Codigo' },
        'description': { 'es': "Descripcion" },
        'search': { 'es': "Buscar" },
        'price': { 'es': "Precio" },
        'load-more': { 'es': "Cargar mas" },
        'unit': { 'es': "Unidad" },
        'margin': { 'es': "Margen" },
        'suggested': { 'es': "Sugerido" },
        'filters': { 'es': "Filtros" },
    }
    return function (key) {
        if (!dictionary[key]) return key;
        return dictionary[key][lang];
    }
})