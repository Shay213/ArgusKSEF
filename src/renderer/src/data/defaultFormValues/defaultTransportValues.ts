const defaultTransportValues = {
  RodzajTransportu: '',
  TransportInny: '',
  OpisInnegoTransportu: '',
  Przewoznik: {
    DaneIdentyfikacyjne: {
      NIP: '',
      KodUE: '',
      NrVatUE: '',
      KodKraju: '',
      NrID: '',
      BrakID: '',
      Nazwa: ''
    },
    AdresPrzewoznika: {
      KodKraju: '',
      AdresL1: '',
      AdresL2: '',
      GLN: ''
    }
  },
  NrZleceniaTransportu: '',
  OpisLadunku: '',
  LadunekInny: '',
  OpisInnegoLadunku: '',
  JednostkaOpakowania: '',
  DataGodzRozpTransportu: '',
  DataGodzZakTransportu: '',
  WysylkaZ: {
    KodKraju: '',
    AdresL1: '',
    AdresL2: '',
    GLN: ''
  },
  WysylkaPrzez: [],
  WysylkaDo: {
    KodKraju: '',
    AdresL1: '',
    AdresL2: '',
    GLN: ''
  }
}

export default defaultTransportValues
