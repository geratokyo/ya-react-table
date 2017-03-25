import * as React from 'react';

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
    dataTypes:any;
    formatter?:(e:any, key:string) => any;
    filterBy?:any;
}

export interface TableState{
    head?:any;
    data?:any;
    order?:boolean;
    orderBy?:string;
}

export class Table extends React.Component<TableProps,TableState>{
    el:HTMLElement;
    parentEl:HTMLElement;
    tableHolderEl: HTMLElement;
    tableHeadEl: HTMLElement;
    tableBodyEl: HTMLElement;
    originalData: any;

    constructor(props:TableProps){
        super(props);

        this.orderData = this.orderData.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onParentScroll = this.onParentScroll.bind(this);

        this.state = {
            head: props.hasHeaders ? props.data[0] : null,
            data: this.originalData = props.hasHeaders ? props.data.slice(1) : props.data,
            order: false,
            orderBy: '',
        };
    }

    orderData(e:any) {
        if(!this.props.enableSort) 
            return;
            
        let state = this.state,
            el = e.target as HTMLElement,
            index = el.getAttribute("data-index"),
            data = state.data,
            order = state.order;
        
        if(state.orderBy != index) {
            data = _(state.data).orderBy((e:any) => {
                return e[index]
            }).value();
            order = false;
        } else {
            data = _.reverse(data);
            order = !order;
        }

        this.setState((prevState, props) => ({
            data: data,            
            order: order,
            orderBy: index,     
        }));        
    }

    componentDidMount() {
        this.el = this.refs['table'] as HTMLElement;
        this.parentEl = this.el.parentElement;
        this.tableHolderEl = this.refs['table-holder'] as HTMLElement;
        this.tableBodyEl = this.refs['table-body'] as HTMLElement;
        this.tableHeadEl = this.refs['table-head'] as HTMLElement;

        this.onResize();        
        this.props.stickyHeaders && (this.props.stickyTo ? this.props.stickyTo : window).addEventListener('scroll', this.onParentScroll);
        this.el.addEventListener('resize', this.onResize);
    }

    componentDidUpdate(nextProps:TableProps) {
        if(nextProps.data !== this.props.data) {

        }
    }

    onResize() {
        if(this.props.stickyHeaders) {
            let bodyCells = this.tableBodyEl.querySelectorAll('.table-head .cell'),
                headCells = this.tableHeadEl.querySelectorAll('.table-head .cell');

            this.tableHeadEl.style.width = this.tableBodyEl.offsetWidth+'px';

            for(let i = 0; i < bodyCells.length; i++) {
                (headCells[i] as HTMLElement).style.width = (bodyCells[i] as HTMLElement).offsetWidth +'px';
            }
        }
    }

    onParentScroll(e:any) {
        let bb = this.el.getBoundingClientRect(),
            hh = this.tableHeadEl.getBoundingClientRect(),
            p = this.props.stickyTo ? this.props.stickyTo : document.body;
        
        this.tableHeadEl.style.top = (bb.top - p.offsetTop < 0 ? p.offsetTop - bb.top : 0) + 'px';
    }    

    formatter(e:any, key:string) {
        return this.props.formatter && 
               this.props.dataTypes && 
               this.props.dataTypes[key] ? this.props.formatter(e,this.props.dataTypes[key]) : e;
    }

    renderHead() {
        let head = this.state.head;

        return (  
            <div className="table-head">
                <div className="row">
                {
                    head && _(head).map((cell:any,i:any)=>{
                        return (
                            <div className={"cell"} 
                                 key={i} 
                                 data-index={i} 
                                 data-active={i == this.state.orderBy} 
                                 onClick={this.orderData}>{ cell }</div>
                        );
                    }).value()
                }
                </div>
            </div>
        );
    }

    render() {
        let props = this.props,
            state = this.state,
            data = state.data,
            colWidth = 100 / _.size(state.head),
            clz = props.className || "",
            tableSettings = [props.style ? props.style : "", props.enableHover ? "hover" : ""].join(" ");

        return (
            <div ref="table" 
                className={"table-component "+clz} 
                data-style={props.style}
                data-enable-sort={props.enableSort}
                data-enable-hover={props.enableHover}
                data-sticky={props.stickyHeaders} 
                data-responsive={props.responsive} 
                data-order={this.state.order} 
                data-order-by={this.state.orderBy}>

                <div ref="table-holder" className="table-holder">

                    { 
                        props.stickyHeaders && state.head && 
                        
                        <div ref="table-head" className={"table th "}>
                            { this.renderHead() }
                        </div>
                    }

                    <div ref="table-body" className={"table tb "}>

                        { state.head && this.renderHead() }
                        
                        <div className="table-body">
                            {
                                data && data.map((row:any, i:any)=>{
                                    return (
                                        <div className="row" key={i}>
                                            { 
                                                _(row).map((cell:any, e:any) => {
                                                    return (
                                                        <div className="cell" key={e}>{ this.formatter(cell,e) }</div>
                                                    )
                                                }).value()
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
            </div>           
        )
    }
}

if (window && document){
    (function(yaReact,W,D){
        yaReact.Table = Table; 
    }((window as any).yaReact = (window as any).yaReact || {},window,document));
}