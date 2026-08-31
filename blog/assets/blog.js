/* ==========================================================================
   AFIM Consulting — blog.js
   JavaScript natif, sans dépendance.
   Le header, le menu mobile et le bouton retour en haut sont déjà gérés par
   script.js (chargé sur toutes les pages du blog). Ce fichier n'ajoute que
   la recherche et les filtres de la page /blog/ et des pages de catégorie :
   toutes les cartes et tous les liens d'articles sont déjà présents dans le
   HTML, le blog reste donc utilisable si ce fichier n'est pas chargé.
   ========================================================================== */
(function () {
    'use strict';

    var list = document.getElementById('blog-articles');
    if (!list) { return; }

    var input = document.getElementById('blog-search');
    var filters = Array.prototype.slice.call(document.querySelectorAll('[data-blog-filter]'));
    var cards = Array.prototype.slice.call(list.querySelectorAll('[data-category]'));
    var status = document.getElementById('blog-status');
    var empty = document.getElementById('blog-empty');

    var activeCategory = 'all';

    var index = cards.map(function (card) {
        var text = [
            card.querySelector('.blog-card__title') ? card.querySelector('.blog-card__title').textContent : '',
            card.querySelector('.blog-card__excerpt') ? card.querySelector('.blog-card__excerpt').textContent : '',
            card.querySelector('.blog-card__cat') ? card.querySelector('.blog-card__cat').textContent : '',
            card.getAttribute('data-keywords') || ''
        ].join(' ');
        return { card: card, haystack: normalize(text) };
    });

    function normalize(value) {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[’']/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function apply() {
        var query = normalize(input ? input.value : '');
        var terms = query ? query.split(' ') : [];
        var visible = 0;

        index.forEach(function (entry) {
            var matchesCategory =
                activeCategory === 'all' ||
                entry.card.getAttribute('data-category') === activeCategory;

            var matchesQuery = terms.every(function (term) {
                return entry.haystack.indexOf(term) !== -1;
            });

            var show = matchesCategory && matchesQuery;
            entry.card.hidden = !show;
            if (show) { visible++; }
        });

        if (empty) { empty.hidden = visible !== 0; }

        if (status) {
            if (visible === 0) {
                status.textContent = 'Aucun article ne correspond à votre recherche.';
            } else if (visible === 1) {
                status.textContent = '1 article affiché.';
            } else {
                status.textContent = visible + ' articles affichés.';
            }
        }
    }

    if (input) {
        input.addEventListener('input', apply);
        var form = input.closest('form');
        if (form) {
            form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
        }
    }

    filters.forEach(function (button) {
        button.addEventListener('click', function () {
            activeCategory = button.getAttribute('data-blog-filter');
            filters.forEach(function (other) {
                other.setAttribute('aria-pressed', other === button ? 'true' : 'false');
            });
            apply();
        });
    });

    apply();
})();
