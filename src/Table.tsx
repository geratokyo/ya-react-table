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
    tableHeadEl: HTMLElement;
    tableBodyEl: HTMLElement;

    constructor(props:TableProps){
        super(props);

        this.orderData = this.orderData.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onScroll = this.onScroll.bind(this);

        this.state = {
            head: props.hasHeaders ? props.data[0] : null,
            data: props.hasHeaders ? props.data.slice(1) : props.data,
            order: false,
            orderBy: ''
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
        this.tableBodyEl = this.refs['table-body'] as HTMLElement;
        this.tableHeadEl = this.refs['table-head'] as HTMLElement;

        this.onResize();
        window.addEventListener('resize', this.onResize);

        this.props.stickyHeaders && (this.props.stickyTo ? this.props.stickyTo : window).addEventListener('scroll', this.onScroll);
    }

    componentDidUpdate(nextProps:TableProps) {
        if(nextProps.data !== this.props.data) {

        }
    }

    onResize() {
        if(this.props.stickyHeaders) {
            let bodyCells = this.tableBodyEl.querySelectorAll('.table-head .cell'),
                headCells = this.tableHeadEl.querySelectorAll('.table-head .cell');

            for(let i = 0; i < bodyCells.length; i++) {
                (headCells[i] as HTMLElement).style.width = (bodyCells[i] as HTMLElement).offsetWidth +'px';
            }
        }
    }

    onScroll(e:any) {
        let bb = this.el.getBoundingClientRect(),
            p = this.props.stickyTo ? this.props.stickyTo : document.body;

        if(this.props.stickyTo) {
            this.tableHeadEl.style.top = (bb.top - this.props.stickyTo.offsetTop < 0 ? this.props.stickyTo.offsetTop - bb.top : 0) + 'px';
        } else {
            this.tableHeadEl.style.position =  bb.top - document.body.offsetTop < 0 ? 'fixed' : 'absolute';
        }
    }
    
    render() {
        let props = this.props,
            state = this.state,
            head = state.head,
            data = state.data,
            colWidth = 100 / _.size(head),
            clz = props.className || "",
            tableSettings = [props.style ? props.style : "", 
                             props.enableHover ? "hover" : ""].join(" ");

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

                { props.stickyHeaders && head && 
                    <div ref="table-head" className={"table th "}>
                        <div className="table-head">
                            <div className="row">
                            {
                                _(head).map((col:any,i:any)=>(
                                    <div className={"cell"} key={i} data-index={i} data-active={i == this.state.orderBy} onClick={this.orderData}>{ col }<div className="cell-fix"></div></div>
                                )).value()
                            }
                            </div>
                        </div>
                    </div>
                }

                <div ref="table-body" className={"table tb "}>
                    { head && 
                        <div className="table-head">
                            <div className="row">
                            {
                                _(head).map((col:any,i:any)=>(
                                    <div className={"cell"} key={i} data-index={i} data-active={i == this.state.orderBy} onClick={this.orderData}>{ col }</div>
                                )).value()
                            }
                            </div>
                        </div>
                    }
                    <div className="table-body">
                    {
                        data && data.map((row:any, i:any)=>{
                            return (
                                <div className="row" key={i}>
                                    { 
                                        _(row).map(function(col:any, e:any){
                                            return (
                                                <div className="cell" key={e}>{ col }</div>
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
        )
    }
}

if (window && document){
    (function(yaReact,W,D){
        yaReact.Table = Table; 
    }((window as any).yaReact = (window as any).yaReact || {},window,document));
}