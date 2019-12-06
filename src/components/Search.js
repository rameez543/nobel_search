import React from 'react';
import '../styles/Search.css';
import { ResultCard } from './ResultCard';
import { API_URL } from '../config';
import { Loader } from './Loader';
import axios from 'axios';

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: [],
            loader: false,
            searchText: '',
            emptyResult: false
        }
    }
    handleChange = (event) => {
        this.setState({ searchText: event.target.value })
    }
    onSearch = async (search) => {
        console.log('searchtce', search)
        this.setState({ loader: true })
        try {
            const resp = await axios.post(`${API_URL}/getResult`, { search })
            if (resp && resp.data && resp.data.success) {
                this.setState({ searchData: resp.data.result, loader: false, emptyResult: false })
                console.log('res', resp.data)
            }
            if (resp && resp.data && !resp.data.success) {
                this.setState({ loader: false, searchData: [], emptyResult: true })
            }
        }
        catch (ex) {
            this.setState({ loader: false })

        }


    }
    render() {
        const { searchData, loader, searchText, emptyResult } = this.state
        return (
            <div className="layout">
                <h1 className="header">
                    Search for Nobel prize winners
            </h1>
                <div >
                    <input type="text" placeholder="search" size={80} className="searchbar" onChange={this.handleChange} />
                </div>
                <div >
                    <button className="btn" onClick={() => this.onSearch(searchText)}>search</button>
                </div>{loader && <Loader />}{
                    emptyResult && <h3>sorry, no results found </h3>
                }
                {searchData.map((item, key) => <ResultCard data={item} key={key} />)}
            </div>
        )
    }
}