// import { useTranslation } from 'react-i18next';
import TableComponent from '../components/tableComponent';

function HomeView() {

  // const { t } = useTranslation();

  const data = {
    nodes: [
      {
        id: 1,
        name: "Estudiar cálculo",
        deadline: '2025-7-5',
        type: "Tarea",
        isComplete: false
      },
      {
        id: 2,
        name: "Preparar presentación",
        deadline: '2025-7-5',
        type: "Proyecto",
        isComplete: true
      },
      {
        id: 3,
        name: "Revisar apuntes",
        deadline: '2025-7-5',
        type: "Tarea",
        isComplete: false
      },
    ],
  };


  return (
    <>
      {/* Home  {t('login.email')} <br /> */}
      <TableComponent
        id_table={'home'}
        table_name={'Tabla Ejemplo'}
        data={data}
      />
    </>
  )
}

export default HomeView;
