const Podmiot1Mapping = {
  'Sprzedawca.Kraj': 'Faktura.Podmiot1.Adres.KodKraju',
  'Sprzedawca.Ulica': 'Faktura.Podmiot1.Adres.AdresL1',
  'Sprzedawca.MiastoIKodPocztowy': 'Faktura.Podmiot1.Adres.AdresL2',
  'Sprzedawca.NIP': 'Faktura.Podmiot1.DaneIdentyfikacyjne.NIP',
  'Sprzedawca.Nazwa': 'Faktura.Podmiot1.DaneIdentyfikacyjne.Nazwa',
  DaneKontaktowe: 'Faktura.Podmiot1.DaneKontaktowe[]+'
}
// Dane kontaktowe is an array
export default Podmiot1Mapping
