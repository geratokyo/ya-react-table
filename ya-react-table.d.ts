declare module "ya-react-table" {
    import {Component} from 'react'; 
    
    export interface TableProps {
        visible:boolean;
        className?:string;
        data:any;
        hasHeaders:boolean;
        stickyHeaders?:boolean;
        stickyTo?:HTMLElement;
        style?:string;
        enableHover?:boolean;
        enableSort?:boolean;  
        responsive?:boolean;  
    }

    export interface TableState{
        head?:any;
        data?:any;
        order?:boolean;
        orderBy?:string;
    }

    export class Table extends Component<TableProps,TableState>{

    }
}