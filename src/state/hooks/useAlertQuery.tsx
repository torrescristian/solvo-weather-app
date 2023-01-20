import { useQuery } from "react-query";

type IOperator = 'colder_than' | 'hotter_than';

export const operators: IOperator[] = ['colder_than', 'hotter_than'];

export interface IAlert {
  operator: IOperator;
  temperature: number;
}

export const getAlertKey = () => 'alert';

export default function useAlertQuery() {
  return useQuery({
    queryKey: getAlertKey(),
    queryFn: async () => {
      const stringValue = localStorage.getItem(getAlertKey()) || '{"operator":"hotter_than","temperature":40}';

      return JSON.parse(stringValue) as IAlert;
    }
  })
}
