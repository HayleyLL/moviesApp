import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Genres from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import SearchBox from "./search";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [], //初始化为数组，数据请求需要时间，避免运行时错误
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  //下面这些事件处理程序都重新设置了state => rerendering,决定向用户展示什么

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]; //将all genres这一项加在前面;展开返回的数组;设置_id,因为不设置All Genres无法设置key

    this.setState({ movies: getMovies(), genres }); //genres:genres
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage1: 1 });
  };

  handleDelete = id => {
    const filterMovies = this.state.movies.filter(c => c._id !== id);
    this.setState({ movies: filterMovies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }; //toggle like

  handlePageChange = page => {
    this.setState({ currentPage: page }); //将所点击的页数设为当前页
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 }); //点击了一个genre之后，将页码重设到1，否则如果之前点击过其它页码，将显示该genre的该页码
  }; //

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    //从render()方法中抽出一个函数，使其更加简洁
    //顺序：先过滤，再排序，再分页
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
      searchQuery
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)


  console.log(a);
  }
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      //新加的all genres这一项没有_id=>又设置成了空字符串
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]); //可以根据不同的属性和方式来排序

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database.</p>;
    const { totalCount, movies } = this.getPageData();

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Genres
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link
              className="btn btn-primary"
              to="/movies/new"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <p>Showing {totalCount} movies in the database.</p>
            <SearchBox onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn} //确保sort order正确地初始化
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              currentPage={currentPage}
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
