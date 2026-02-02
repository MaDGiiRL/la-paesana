
const euro = (n) => Number(n);

export const MENU_SEED = {
    meta: {
        place: "La Paesana For Family",
        copertoEServizio: euro(2.0),
        note:
            "Consumazione sul posto. Le foto dei piatti sono indicative e potrebbero non essere esatte.",
    },

    // Menù normale: array unico di piatti con course
    regularItems: [
        // =========================
        // ANTIPASTI DI PESCE
        // =========================
        { id: "a-pesce-sarde-saor", course: "antipasti", name: "Sarde in saor", desc: "", price: euro(10.5), image: "" },
        { id: "a-pesce-impepata-cozze-vongole", course: "antipasti", name: "Impepata di cozze e vongole", desc: "", price: euro(12), image: "" },

        { id: "a-pesce-cozze-vongole-marinara", course: "antipasti", name: "Cozze e vongole alla marinara", desc: "", price: euro(13), image: "" },
        { id: "a-pesce-cocktail-gamberetti", course: "antipasti", name: "Cocktail di gamberetti", desc: "Gamberi in salsa rosa", price: euro(11.5), image: "" },
        { id: "a-pesce-insalata-piovra", course: "antipasti", name: "Insalata di piovra", desc: "Con sedano e pomodorini", price: euro(12.5), image: "" },
        { id: "a-pesce-antipasto-crudo", course: "antipasti", name: "Antipasto crudo di pesce", desc: "Selezione di crudi", price: euro(30.5), image: "" },

        // “Impepata / Marinara” (voci ripetute nel PDF)
        { id: "a-pesce-impepata-cozze", course: "antipasti", name: "Impepata di cozze", desc: "", price: euro(10), image: "" },
        { id: "a-pesce-cozze-marinara", course: "antipasti", name: "Cozze alla marinara", desc: "", price: euro(11), image: "" },
        { id: "a-pesce-impepata-vongole", course: "antipasti", name: "Impepata di vongole", desc: "", price: euro(13), image: "" },
        { id: "a-pesce-tris", course: "antipasti", name: "Antipasto tris di pesce", desc: "", price: euro(15.5), image: "" },
        { id: "a-pesce-vongole-marinara", course: "antipasti", name: "Vongole alla marinara", desc: "", price: euro(14), image: "" },

        // Prezzi “Antipasti di pesce” (come da PDF, alcune varianti bianco/rosso)
        { id: "pz-antipasti-pesce-950", course: "antipasti", name: "Antipasti di pesce", desc: "Prezzo base", price: euro(10.5), image: "" },
        { id: "pz-antipasti-pesce-bianco-1100", course: "antipasti", name: "Antipasti di pesce (in bianco)", desc: "", price: euro(12.0), image: "" },
        { id: "pz-antipasti-pesce-rosso-1200", course: "antipasti", name: "Antipasti di pesce (in rosso)", desc: "", price: euro(13.0), image: "" },
        { id: "pz-antipasto-tris-1450", course: "antipasti", name: "Antipasto tris (salsa rosa/piovra/sarde)", desc: "Gamberi in salsa rosa, piovra con sedano e pomodorini, sarde in saor", price: euro(14.5), image: "" },

        // =========================
        // PRIMI DI PESCE
        // =========================
        { id: "p-pesce-spaghetti-cozze", course: "primi", name: "Spaghetti alle cozze", desc: "", price: euro(11.0), image: "" },
        { id: "p-pesce-spaghetti-nero-seppia", course: "primi", name: "Spaghetti al nero di seppia", desc: "", price: euro(11.5), image: "" },
        { id: "p-pesce-bavette-salmone", course: "primi", name: "Bavette al salmone", desc: "", price: euro(11.5), image: "" },
        { id: "p-pesce-bavette-zucchine-gamberetti", course: "primi", name: "Bavette zucchine e gamberetti", desc: "", price: euro(12.0), image: "" },
        { id: "p-pesce-gnocchi-branzino-ciliegino", course: "primi", name: "Gnocchi polpa di branzino e ciliegino", desc: "", price: euro(12.0), image: "" },

        { id: "p-pesce-spaghetti-vongole", course: "primi", name: "Spaghetti alle vongole", desc: "", price: euro(13.0), image: "" },
        { id: "p-pesce-tagliatelle-busara", course: "primi", name: "Tagliatelle alla busara", desc: "", price: euro(14.5), image: "" },

        { id: "p-pesce-spaghetti-scogliera", course: "primi", name: "Spaghetti alla scogliera", desc: "", price: euro(16.5), image: "" },
        { id: "p-pesce-risotto-nero-seppia", course: "primi", name: "Risotto nero di seppia", desc: "Minimo due persone • prezzo a persona", price: euro(17.0), image: "" },
        { id: "p-pesce-risotto-frutti-mare", course: "primi", name: "Risotto frutti di mare", desc: "Minimo due persone • prezzo a persona", price: euro(17.5), image: "" },

        // Varianti rosso/bianco citate nel PDF (le metto come righe separate)
        { id: "p-pesce-spaghetti-cozze-rosso", course: "primi", name: "Spaghetti alle cozze (in rosso)", desc: "", price: euro(14.0), image: "" },
        { id: "p-pesce-cozze-vongole-bianco", course: "primi", name: "Spaghetti cozze e vongole (in bianco)", desc: "", price: euro(14.0), image: "" },
        { id: "p-pesce-spaghetti-vongole-rosso", course: "primi", name: "Spaghetti alle vongole (in rosso)", desc: "", price: euro(15.0), image: "" },
        { id: "p-pesce-cozze-vongole-rosso", course: "primi", name: "Spaghetti cozze e vongole (in rosso)", desc: "", price: euro(14.5), image: "" },

        // =========================
        // SECONDI DI PESCE
        // =========================
        { id: "s-pesce-capesante-griglia", course: "secondi", name: "Capesante alla griglia", desc: "Gratinate alla Paesana", price: euro(5.5), image: "" },
        { id: "s-pesce-capesante-3pz", course: "secondi", name: "Capesante alla griglia (3 pezzi)", desc: "", price: euro(14.0), image: "" },

        { id: "s-pesce-branzino-griglia", course: "secondi", name: "Branzino alla griglia", desc: "", price: euro(14.0), image: "" },
        { id: "s-pesce-gamberi-griglia", course: "secondi", name: "Gamberi alla griglia", desc: "Prezzo 5 pezzi", price: euro(16.0), image: "" },
        { id: "s-pesce-seppie-griglia", course: "secondi", name: "Seppie alla griglia", desc: "Prezzo 4 pezzi", price: euro(16.5), image: "" },

        { id: "s-pesce-frittura-calamari", course: "secondi", name: "Frittura di calamari", desc: "", price: euro(14.5), image: "" },
        { id: "s-pesce-frittura-mista", course: "secondi", name: "Frittura mista", desc: "", price: euro(15.5), image: "" },
        {
            id: "s-pesce-grigliata-mista",
            course: "secondi",
            name: "Grigliata mista",
            desc: "1 branzino, 1 seppia, 1 gamberone, 3 cape lunghe • su prenotazione/attesa 30-40 min (per 2 persone)",
            price: euro(17.5),
            image: "",
        },

        // Su ordinazione (prezzi mercato)
        { id: "s-pesce-rombo-forno", course: "secondi", name: "Rombo al forno", desc: "Con patate, olive nere e capperi • prezzo secondo mercato", price: "Da Calcolare", image: "" },
        { id: "s-pesce-anguille-umido", course: "secondi", name: "Anguilla in umido alla napoletana", desc: "Servita con polenta • prezzo secondo mercato", price: "Da Calcolare", image: "" },

        // =========================
        // ANTIPASTI ALTERNATIVI
        // =========================
        { id: "a-alt-fantasia-new-oasi", course: "antipasti", name: "Antipasto fantasia New Oasi", desc: "", price: euro(10.5), image: "" },
        { id: "a-alt-fritto-misto-chef", course: "antipasti", name: "Fritto misto dello chef", desc: "Pepite di pollo, olive ascolane, mozzarelline impanate, crocchè di patate, patate fritte", price: euro(10.5), image: "" },
        { id: "a-alt-caprese-bufala", course: "antipasti", name: "Caprese di bufala", desc: "", price: euro(11.0), image: "" },
        { id: "a-alt-latticini-radicchio", course: "antipasti", name: "Latticini su letto di radicchio", desc: "", price: euro(11.5), image: "" },
        { id: "a-alt-affettati-bufala-olive", course: "antipasti", name: "Affettati misti con bufala e olive", desc: "", price: euro(12.0), image: "" },

        // =========================
        // PRIMI ALTERNATIVI
        // =========================
        { id: "p-alt-tagliatelle-pomodoro-basilico", course: "primi", name: "Tagliatelle al pomodoro e basilico", desc: "", price: euro(9.0), image: "" },
        { id: "p-alt-spaghetti-pesto-genovese", course: "primi", name: "Spaghetti pesto alla genovese", desc: "", price: euro(9.5), image: "" },
        { id: "p-alt-spaghetti-bolognese", course: "primi", name: "Spaghetti alla bolognese", desc: "Ragù di carne mista in rosso (produzione propria)", price: euro(10.0), image: "" },
        { id: "p-alt-spaghetti-carbonara", course: "primi", name: "Spaghetti alla carbonara", desc: "", price: euro(10.5), image: "" },
        { id: "p-alt-tagliatelle-amatriciana", course: "primi", name: "Tagliatelle all'amatriciana", desc: "", price: euro(10.5), image: "" },
        { id: "p-alt-gnocchi-prosciutto-funghi-panna", course: "primi", name: "Gnocchi prosciutto funghi e panna", desc: "", price: euro(10.5), image: "" },
        { id: "p-alt-gnocchi-4formaggi-sfilacci", course: "primi", name: "Gnocchi ai 4 formaggi e sfilacci di puledro", desc: "", price: euro(11.5), image: "" },
        { id: "p-alt-risotto-radicchio-porcini", course: "primi", name: "Risotto radicchio e porcini", desc: "Minimo 2 persone • prezzo a persona", price: euro(13.5), image: "" },
        { id: "p-alt-risotto-speck-brie-zucchine", course: "primi", name: "Risotto speck brie e zucchine", desc: "Minimo 2 persone • prezzo a persona", price: euro(14.5), image: "" },

        // =========================
        // SECONDI ALTERNATIVI
        // =========================
        { id: "s-alt-braciola-maiale", course: "secondi", name: "Braciola di maiale", desc: "", price: euro(9.5), image: "" },
        { id: "s-alt-petto-pollo-ferri", course: "secondi", name: "Petto di pollo ai ferri", desc: "", price: euro(10.0), image: "" },
        { id: "s-alt-bistecca-manzo", course: "secondi", name: "Bistecca di manzo", desc: "", price: euro(11.0), image: "" },
        { id: "s-alt-bistecca-pizzaiola", course: "secondi", name: "Bistecca alla pizzaiola", desc: "Sugo di pomodoro, mozzarella e origano", price: euro(12.5), image: "" },
        { id: "s-alt-tagliata-rucola-grana-balsamico", course: "secondi", name: "Tagliata rucola, grana e aceto balsamico", desc: "", price: euro(15.5), image: "" },
        {
            id: "s-alt-grigliata-mista",
            course: "secondi",
            name: "Grigliata mista",
            desc: "Braciola di maiale intera, mezza bistecca di manzo, mezzo petto di pollo, una salsiccia",
            price: euro(16.5),
            image: "",
        },
        { id: "s-alt-cotoletta-pollo-patate", course: "secondi", name: "Cotoletta di pollo con patate fritte", desc: "", price: euro(12.5), image: "" },

        // =========================
        // PIZZE
        // =========================
        { id: "pz-marinara", course: "pizza", name: "Marinara", desc: "Pomodoro, aglio, origano", price: euro(5.5), image: "" },
        { id: "pz-margherita", course: "pizza", name: "Margherita", desc: "Pomodoro, mozzarella", price: euro(6.5), image: "" },
        { id: "pz-romana", course: "pizza", name: "Romana", desc: "Pomodoro, mozzarella, filetti di acciughe", price: euro(8.5), image: "" },
        { id: "pz-napoletana", course: "pizza", name: "Napoletana", desc: "Pomodoro, mozzarella, acciughe e capperi", price: euro(9.0), image: "" },
        { id: "pz-siciliana", course: "pizza", name: "Siciliana", desc: "Pomodoro, mozzarella, acciughe, capperi, olive", price: euro(9.5), image: "" },
        { id: "pz-prosciutto", course: "pizza", name: "Prosciutto", desc: "Pomodoro, mozzarella, prosciutto", price: euro(8.5), image: "" },
        { id: "pz-prosciutto-funghi", course: "pizza", name: "Prosciutto e funghi", desc: "Pomodoro, mozzarella, prosciutto, funghi", price: euro(9.5), image: "" },
        { id: "pz-capricciosa", course: "pizza", name: "Capricciosa", desc: "Pomodoro, mozzarella, prosciutto, funghi, carciofi", price: euro(9.0), image: "" },
        { id: "pz-quattro-stagioni", course: "pizza", name: "Quattro stagioni", desc: "Pomodoro, mozzarella, prosciutto, funghi, carciofi, olive", price: euro(10.5), image: "" },
        { id: "pz-calzone", course: "pizza", name: "Calzone", desc: "Pomodoro, mozzarella, prosciutto, funghi", price: euro(9.5), image: "" },
        { id: "pz-quattro-formaggi", course: "pizza", name: "Quattro formaggi", desc: "Pomodoro, mozzarella, formaggi", price: euro(10.0), image: "" },
        { id: "pz-salamino", course: "pizza", name: "Salamino", desc: "Pomodoro, mozzarella, salamino piccante", price: euro(8.5), image: "" },
        { id: "pz-tonno-cipolla", course: "pizza", name: "Tonno e cipolla", desc: "Pomodoro, mozzarella, tonno, cipolla", price: euro(9.5), image: "" },
        { id: "pz-fantasia-pizzaiola", course: "pizza", name: "Fantasia pizzaiola", desc: "Ispirazione del momento", price: euro(10.5), image: "" },

        // “A richiesta” dal PDF (aggiungo quelle elencate)
        { id: "pz-san-daniele", course: "pizza", name: "San Daniele", desc: "Pomodoro, mozzarella, prosciutto crudo", price: euro(9.5), image: "" },
        { id: "pz-parmigiana", course: "pizza", name: "Parmigiana", desc: "Pomodoro, mozzarella, melanzane, grana", price: euro(9.5), image: "" },
        { id: "pz-salsiccia", course: "pizza", name: "Salsiccia", desc: "Pomodoro, mozzarella, salsiccia", price: euro(9.0), image: "" },
        { id: "pz-gamberetti", course: "pizza", name: "Gamberetti", desc: "Pomodoro, mozzarella, gamberetti", price: euro(10.5), image: "" },
        { id: "pz-frutti-di-mare", course: "pizza", name: "Frutti di mare", desc: "Pomodoro, mozzarella, frutti di mare", price: euro(13.5), image: "" },
        { id: "pz-verdure", course: "pizza", name: "Verdure", desc: "Pomodoro, mozzarella, melanzane, zucchine, peperoni, radicchio", price: euro(10.0), image: "" },
        { id: "pz-bufalina", course: "pizza", name: "Bufalina", desc: "Pomodoro, mozzarella di bufala", price: euro(10.0), image: "" },
        { id: "pz-viennese", course: "pizza", name: "Viennese", desc: "Pomodoro, mozzarella, wurstel", price: euro(8.5), image: "" },
        { id: "pz-patatosa", course: "pizza", name: "Patatosa", desc: "Pomodoro, mozzarella, patatine fritte", price: euro(9.0), image: "" },
        { id: "pz-chioggiotta", course: "pizza", name: "Chioggiotta", desc: "Pomodoro, mozzarella, radicchio di Chioggia", price: euro(8.5), image: "" },
        { id: "pz-kebab", course: "pizza", name: "Pizza kebab", desc: "Pomodoro, mozzarella, kebab, cetrioli, insalata, cipolla, salse", price: euro(13.5), image: "" },
        { id: "pz-new-oasi", course: "pizza", name: "Pizza New Oasi", desc: "Pomodoro, mozzarella, peperoni, salamino, olive, feta greca", price: euro(11.5), image: "" },

        // =========================
        // CONTORNI
        // =========================
        { id: "c-patate-fritte", course: "contorni", name: "Patate fritte", desc: "", price: euro(5.5), image: "" },
        { id: "c-insalata-mista", course: "contorni", name: "Insalata mista", desc: "", price: euro(6.0), image: "" },
        { id: "c-fagioli-cipolla", course: "contorni", name: "Fagioli con cipolla", desc: "", price: euro(6.5), image: "" },
        { id: "c-verdure-stagione-bollite", course: "contorni", name: "Verdure di stagione bollite", desc: "", price: euro(7.0), image: "" },
        { id: "c-verdure-griglia", course: "contorni", name: "Verdure alla griglia", desc: "", price: euro(7.0), image: "" },

        // =========================
        // INSALATONE
        // =========================
        { id: "ins-copacabana", course: "contorni", name: "Copacabana", desc: "Lattuga, rucola, pomodoro, mais, carote, mozzarella", price: euro(9.5), image: "" },
        { id: "ins-alemanno", course: "contorni", name: "Alemanno", desc: "Lattuga, pomodoro, mozzarella, cipolla, strisce di prosciutto, olive nere", price: euro(10.5), image: "" },
        { id: "ins-nostromo", course: "contorni", name: "Nostromo", desc: "Lattuga, rucola, carote, mozzarella, gamberetti, tonno, polpa di granchio", price: euro(11.5), image: "" },

        // =========================
        // DESSERT
        // =========================
        { id: "d-tiramisu", course: "dolci", name: "Tiramisù della casa", desc: "", price: euro(5.0), image: "" },
        { id: "d-torta-crema", course: "dolci", name: "Torta alla crema della casa", desc: "", price: euro(5.0), image: "" },
        { id: "d-crostata", course: "dolci", name: "Crostata di marmellata della casa", desc: "", price: euro(5.0), image: "" },
        { id: "d-profitterol", course: "dolci", name: "Profitterol", desc: "", price: euro(5.0), image: "" },
        { id: "d-meringata", course: "dolci", name: "Meringata", desc: "", price: euro(5.0), image: "" },
        { id: "d-tartufo-nero", course: "dolci", name: "Tartufo nero", desc: "Gelato", price: euro(5.0), image: "" },
        { id: "d-tartufo-bianco", course: "dolci", name: "Tartufo bianco", desc: "Gelato", price: euro(5.0), image: "" },
        { id: "d-tartufo-affogato", course: "dolci", name: "Tartufo affogato al caffè", desc: "", price: euro(6.0), image: "" },
        { id: "d-tartufo-whisky-affogato", course: "dolci", name: "Tartufo con crema whisky affogato al caffè", desc: "", price: euro(7.0), image: "" },

        // =========================
        // DRINKS / BEVANDE
        // =========================
        { id: "b-vino-frizzante-1-4", course: "bevande", name: "Vino frizzante (1/4 lt)", desc: "", price: euro(3.5), image: "" },
        { id: "b-vino-frizzante-1-2", course: "bevande", name: "Vino frizzante (1/2 lt)", desc: "", price: euro(6.0), image: "" },
        { id: "b-vino-frizzante-1l", course: "bevande", name: "Vino frizzante (1 lt)", desc: "", price: euro(10.0), image: "" },

        { id: "b-rosso-cabernet-1-4", course: "bevande", name: "Rosso Cabernet Frank (1/4 lt)", desc: "", price: euro(3.0), image: "" },
        { id: "b-rosso-cabernet-1-2", course: "bevande", name: "Rosso Cabernet Frank (1/2 lt)", desc: "", price: euro(5.0), image: "" },
        { id: "b-rosso-cabernet-1l", course: "bevande", name: "Rosso Cabernet Frank (1 lt)", desc: "", price: euro(8.5), image: "" },

        { id: "b-bianco-chardonnay-1-4", course: "bevande", name: "Bianco Chardonnay (1/4 lt)", desc: "", price: euro(3.0), image: "" },
        { id: "b-bianco-chardonnay-1-2", course: "bevande", name: "Bianco Chardonnay (1/2 lt)", desc: "", price: euro(5.0), image: "" },
        { id: "b-bianco-chardonnay-1l", course: "bevande", name: "Bianco Chardonnay (1 lt)", desc: "", price: euro(8.5), image: "" },

        { id: "b-bottiglia-vino", course: "bevande", name: "Bottiglia vino (rosso/bianco/prosecco)", desc: "", price: euro(8.5), image: "" },

        // Caffetteria (prezzi “a scalare” come nel PDF)
        { id: "b-caffe", course: "bevande", name: "Caffè espresso", desc: "", price: euro(1.0), image: "" },
        { id: "b-macchiato", course: "bevande", name: "Caffè macchiato", desc: "", price: euro(1.1), image: "" },
        { id: "b-decaffeinato", course: "bevande", name: "Decaffeinato", desc: "", price: euro(1.2), image: "" },
        { id: "b-orzo", course: "bevande", name: "Orzo", desc: "", price: euro(1.3), image: "" },
        { id: "b-corretto", course: "bevande", name: "Caffè corretto", desc: "", price: euro(1.5), image: "" },

        // Amari / liquori / whisky / grappe (riassunto con prezzi)
        { id: "b-amari", course: "bevande", name: "Amari / Liquori", desc: "Montenegro, Averna, Lucano, Ramazzotti, Fernet, Branca Menta, Jagermeister, ecc.", price: euro(3.0), image: "" },
        { id: "b-whisky", course: "bevande", name: "Whisky", desc: "Glen Grant, J&B, Jack Daniel's, Ballantine's", price: euro(4.0), image: "" },
        { id: "b-grappe", course: "bevande", name: "Grappe", desc: "Prime Uve, Nardini, Storica nera, ecc.", price: euro(4.0), image: "" },

        // Bibite
        { id: "bib-coca-033", course: "bevande", name: "Coca-Cola (0,33 lt)", desc: "", price: euro(3.0), image: "" },
        { id: "bib-fanta-033", course: "bevande", name: "Fanta (0,33 lt)", desc: "", price: euro(3.0), image: "" },
        { id: "bib-acqua-05", course: "bevande", name: "Acqua (0,50 lt)", desc: "", price: euro(1.5), image: "" },
        { id: "bib-acqua-1l", course: "bevande", name: "Acqua (1 lt)", desc: "", price: euro(3.0), image: "" },
        { id: "bib-succhi", course: "bevande", name: "Succhi", desc: "", price: euro(2.5), image: "" },
        { id: "bib-altre", course: "bevande", name: "Altre bibite", desc: "", price: euro(3.0), image: "" },

        // Birre (riassunto)
        { id: "birra-020", course: "bevande", name: "Birra (0,20 lt)", desc: "", price: euro(3.0), image: "" },
        { id: "birra-040", course: "bevande", name: "Birra (0,40 lt)", desc: "", price: euro(5.0), image: "" },
        { id: "birra-bottiglia-033-300", course: "bevande", name: "Birra bottiglia (0,33 lt)", desc: "", price: euro(3.0), image: "" },
        { id: "birra-bottiglia-033-400", course: "bevande", name: "Birra bottiglia (0,33 lt) premium", desc: "", price: euro(4.0), image: "" },
        { id: "birra-bottiglia-033-350", course: "bevande", name: "Birra bottiglia (0,33 lt) special", desc: "", price: euro(3.5), image: "" },
    ],
};

export default MENU_SEED;
