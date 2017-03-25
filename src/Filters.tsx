import * as React from 'react';

export interface FiltersProps {
    visible:boolean;
    className?:string;
    data:any;
    by:any;
    callback:(data:any) => void;
}

export interface FiltersState{
    active?:any;
}

export class Filters extends React.Component<FiltersProps,FiltersState>{
    el:HTMLElement;

    constructor(props:FiltersProps){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.state = {
            active: {}
        }
    }

    onChange(e:any) {
        let el = e.currentTarget as HTMLSelectElement,
            af = this.state.active;
        
        if(el.value !== "") {
            af[el.getAttribute('data-filter')+""] = el.value;
        } else {
            delete af[el.getAttribute('data-filter')];
        }

        this.props.callback(
            _(this.props.data).filter((d:any) => {
                let status = _(af).map((f:any,k:any) => {
                    return d[k] == f;
                }).value();            
                return !/false/i.test(status.join(''));
            }).value()
        );

        this.setState({ 
            active: af        
        });
    }

    render() {
        let data = this.props.data.slice(1),
            head = this.props.data[0];

        return (
            <div className="table-filters">
                {
                    this.props.by.map((i:any) => {
                        return (
                            <select onChange={this.onChange} data-filter={i} key={i}>
                                <option value="">{head[i]}</option>
                                {
                                    _(_.uniqBy(data,i)).map((d:any,l:any) => {
                                        return (<option value={d[i]} key={l}>{d[i]}</option>);
                                    }).value()
                                }
                            </select>
                        )
                    })
                }
            </div>
        );        
    }
}

if (window && document){
    (function(yaReact,W,D){
        yaReact.Filters = Filters; 
    }((window as any).yaReact = (window as any).yaReact || {},window,document));
}