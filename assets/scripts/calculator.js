// libs
/* jQuery Form Styler v2.0.2 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
! function( e ) {
	'function' == typeof define && define.amd ? define( [ 'jquery' ], e ) : 'object' == typeof exports ? module.exports = e( $ || require( 'jquery' ) ) : e( jQuery );
}( function( e ) {
	'use strict';

	function t( t, s ) {
		this.element = t, this.options = e.extend( {}, l, s );
		var i = this.options.locale;
		void 0 !== this.options.locales[i] && e.extend( this.options, this.options.locales[i] ), this.init();
	}

	function s( t ) {
		if (! e( t.target ).parents().hasClass( 'jq-selectbox' ) && 'OPTION' != t.target.nodeName && e( 'div.jq-selectbox.opened' ).length) {
			var s = e( 'div.jq-selectbox.opened' ),
				l = e( 'div.jq-selectbox__search input', s ),
				o = e( 'div.jq-selectbox__dropdown', s );
			s.find( 'select' ).data( '_' + i ).options.onSelectClosed.call( s ), l.length && l.val( '' ).keyup(), o.hide().find( 'li.sel' ).addClass( 'selected' ), s.removeClass( 'focused opened dropup dropdown' );
		}
	}

	var i = 'styler',
		l = {
			idSuffix: '-styler',
			filePlaceholder: 'Файл не выбран',
			fileBrowse: 'Обзор...',
			fileNumber: 'Выбрано файлов: %s',
			selectPlaceholder: 'Выберите...',
			selectSearch: ! 1,
			selectSearchLimit: 10,
			selectSearchNotFound: 'Совпадений не найдено',
			selectSearchPlaceholder: 'Поиск...',
			selectVisibleOptions: 0,
			selectSmartPositioning: ! 0,
			locale: 'ru',
			locales: {
				en: {
					filePlaceholder: 'No file selected',
					fileBrowse: 'Browse...',
					fileNumber: 'Selected files: %s',
					selectPlaceholder: 'Select...',
					selectSearchNotFound: 'No matches found',
					selectSearchPlaceholder: 'Search...'
				}
			},
			onSelectOpened: function() {
			},
			onSelectClosed: function() {
			},
			onFormStyled: function() {
			}
		};
	t.prototype = {
		init: function() {
			function t() {
				void 0 !== i.attr( 'id' ) && '' !== i.attr( 'id' ) && ( this.id = i.attr( 'id' ) + l.idSuffix ), this.title = i.attr( 'title' ), this.classes = i.attr( 'class' ), this.data = i.data();
			}

			var i = e( this.element ),
				l = this.options,
				o = ! ( ! navigator.userAgent.match( /(iPad|iPhone|iPod)/i ) || navigator.userAgent.match( /(Windows\sPhone)/i ) ),
				a = ! ( ! navigator.userAgent.match( /Android/i ) || navigator.userAgent.match( /(Windows\sPhone)/i ) );
			if (i.is( ':checkbox' )) {
				var d = function() {
					var s = new t,
						l = e( '<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>' ).attr( {
							id: s.id,
							title: s.title
						} ).addClass( s.classes ).data( s.data );
					i.after( l ).prependTo( l ), i.is( ':checked' ) && l.addClass( 'checked' ), i.is( ':disabled' ) && l.addClass( 'disabled' ), l.click( function( e ) {
						e.preventDefault(), i.triggerHandler( 'click' ), l.is( '.disabled' ) || ( i.is( ':checked' ) ? ( i.prop( 'checked', ! 1 ), l.removeClass( 'checked' ) ) : ( i.prop( 'checked', ! 0 ), l.addClass( 'checked' ) ), i.focus().change() );
					} ), i.closest( 'label' ).add( 'label[for="' + i.attr( 'id' ) + '"]' ).on( 'click.styler', function( t ) {
						e( t.target ).is( 'a' ) || e( t.target ).closest( l ).length || ( l.triggerHandler( 'click' ), t.preventDefault() );
					} ), i.on( 'change.styler', function() {
						i.is( ':checked' ) ? l.addClass( 'checked' ) : l.removeClass( 'checked' );
					} ).on( 'keydown.styler', function( e ) {
						32 == e.which && l.click();
					} ).on( 'focus.styler', function() {
						l.is( '.disabled' ) || l.addClass( 'focused' );
					} ).on( 'blur.styler', function() {
						l.removeClass( 'focused' );
					} );
				};
				d(), i.on( 'refresh', function() {
					i.closest( 'label' ).add( 'label[for="' + i.attr( 'id' ) + '"]' ).off( '.styler' ), i.off( '.styler' ).parent().before( i ).remove(), d();
				} );
			} else if (i.is( ':radio' )) {
				var r = function() {
					var s = new t,
						l = e( '<div class="jq-radio"><div class="jq-radio__div"></div></div>' ).attr( {
							id: s.id,
							title: s.title
						} ).addClass( s.classes ).data( s.data );
					i.after( l ).prependTo( l ), i.is( ':checked' ) && l.addClass( 'checked' ), i.is( ':disabled' ) && l.addClass( 'disabled' ), e.fn.commonParents = function() {
						var t = this;
						return t.first().parents().filter( function() {
							return e( this ).find( t ).length === t.length;
						} );
					}, e.fn.commonParent = function() {
						return e( this ).commonParents().first();
					}, l.click( function( t ) {
						if (t.preventDefault(), i.triggerHandler( 'click' ), ! l.is( '.disabled' )) {
							var s = e( 'input[name="' + i.attr( 'name' ) + '"]' );
							s.commonParent().find( s ).prop( 'checked', ! 1 ).parent().removeClass( 'checked' ), i.prop( 'checked', ! 0 ).parent().addClass( 'checked' ), i.focus().change();
						}
					} ), i.closest( 'label' ).add( 'label[for="' + i.attr( 'id' ) + '"]' ).on( 'click.styler', function( t ) {
						e( t.target ).is( 'a' ) || e( t.target ).closest( l ).length || ( l.triggerHandler( 'click' ), t.preventDefault() );
					} ), i.on( 'change.styler', function() {
						i.parent().addClass( 'checked' );
					} ).on( 'focus.styler', function() {
						l.is( '.disabled' ) || l.addClass( 'focused' );
					} ).on( 'blur.styler', function() {
						l.removeClass( 'focused' );
					} );
				};
				r(), i.on( 'refresh', function() {
					i.closest( 'label' ).add( 'label[for="' + i.attr( 'id' ) + '"]' ).off( '.styler' ), i.off( '.styler' ).parent().before( i ).remove(), r();
				} );
			} else if (i.is( ':file' )) {
				var c = function() {
					var s = new t,
						o = i.data( 'placeholder' );
					void 0 === o && ( o = l.filePlaceholder );
					var a = i.data( 'browse' );
					void 0 !== a && '' !== a || ( a = l.fileBrowse );
					var d = e( '<div class="jq-file"><div class="jq-file__name">' + o + '</div><div class="jq-file__browse">' + a + '</div></div>' ).attr( {
						id: s.id,
						title: s.title
					} ).addClass( s.classes ).data( s.data );
					i.after( d ).appendTo( d ), i.is( ':disabled' ) && d.addClass( 'disabled' );
					var r = i.val(),
						c = e( 'div.jq-file__name', d );
					r && c.text( r.replace( /.+[\\\/]/, '' ) ), i.on( 'change.styler', function() {
						var e = i.val();
						if (i.is( '[multiple]' )) {
							e = '';
							var t = i[0].files.length;
							if (t > 0) {
								var s = i.data( 'number' );
								void 0 === s && ( s = l.fileNumber ), s = s.replace( '%s', t ), e = s;
							}
						}
						c.text( e.replace( /.+[\\\/]/, '' ) ), '' === e ? ( c.text( o ), d.removeClass( 'changed' ) ) : d.addClass( 'changed' );
					} ).on( 'focus.styler', function() {
						d.addClass( 'focused' );
					} ).on( 'blur.styler', function() {
						d.removeClass( 'focused' );
					} ).on( 'click.styler', function() {
						d.removeClass( 'focused' );
					} );
				};
				c(), i.on( 'refresh', function() {
					i.off( '.styler' ).parent().before( i ).remove(), c();
				} );
			} else if (i.is( 'input[type="number"]' )) {
				var n = function() {
					var s = new t,
						l = e( '<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>' ).attr( {
							id: s.id,
							title: s.title
						} ).addClass( s.classes ).data( s.data );
					i.after( l ).prependTo( l ).wrap( '<div class="jq-number__field"></div>' ), i.is( ':disabled' ) && l.addClass( 'disabled' );
					var o,
						a,
						d,
						r = null,
						c = null;
					void 0 !== i.attr( 'min' ) && ( o = i.attr( 'min' ) ), void 0 !== i.attr( 'max' ) && ( a = i.attr( 'max' ) ), d = void 0 !== i.attr( 'step' ) && e.isNumeric( i.attr( 'step' ) ) ? Number( i.attr( 'step' ) ) : Number( 1 );
					var n = function( t ) {
						var s,
							l = i.val();
						e.isNumeric( l ) || ( l = 0, i.val( '0' ) ), t.is( '.minus' ) ? s = Number( l ) - d : t.is( '.plus' ) && ( s = Number( l ) + d );
						var r = ( d.toString().split( '.' )[1] || [] ).length;
						if (r > 0) {
							for (var c = '1'; c.length <= r;) {
								c += '0';
							}
							s = Math.round( s * c ) / c;
						}
						e.isNumeric( o ) && e.isNumeric( a ) ? s >= o && s <= a && i.val( s ) : e.isNumeric( o ) && ! e.isNumeric( a ) ? s >= o && i.val( s ) : ! e.isNumeric( o ) && e.isNumeric( a ) ? s <= a && i.val( s ) : i.val( s );
					};
					l.is( '.disabled' ) || ( l.on( 'mousedown', 'div.jq-number__spin', function() {
						var t = e( this );
						n( t ), r = setTimeout( function() {
							c = setInterval( function() {
								n( t );
							}, 40 );
						}, 350 );
					} ).on( 'mouseup mouseout', 'div.jq-number__spin', function() {
						clearTimeout( r ), clearInterval( c );
					} ).on( 'mouseup', 'div.jq-number__spin', function() {
						i.change().trigger( 'input' );
					} ), i.on( 'focus.styler', function() {
						l.addClass( 'focused' );
					} ).on( 'blur.styler', function() {
						l.removeClass( 'focused' );
					} ) );
				};
				n(), i.on( 'refresh', function() {
					i.off( '.styler' ).closest( '.jq-number' ).before( i ).remove(), n();
				} );
			} else if (i.is( 'select' )) {
				var f = function() {
					function d( e ) {
						var t = e.prop( 'scrollHeight' ) - e.outerHeight(),
							s = null,
							i = null;
						e.off( 'mousewheel DOMMouseScroll' ).on( 'mousewheel DOMMouseScroll', function( l ) {
							s = l.originalEvent.detail < 0 || l.originalEvent.wheelDelta > 0 ? 1 : -1, ( ( i = e.scrollTop() ) >= t && s < 0 || i <= 0 && s > 0 ) && ( l.stopPropagation(), l.preventDefault() );
						} );
					}

					function r() {
						for (var e = 0; e < c.length; e++) {
							var t = c.eq( e ),
								s = '',
								i = '',
								o = '',
								a = '',
								d = '',
								r = '',
								f = '',
								h = '',
								u = '';
							t.prop( 'selected' ) && ( i = 'selected sel' ), t.is( ':disabled' ) && ( i = 'disabled' ), t.is( ':selected:disabled' ) && ( i = 'selected sel disabled' ), void 0 !== t.attr( 'id' ) && '' !== t.attr( 'id' ) && ( a = ' id="' + t.attr( 'id' ) + l.idSuffix + '"' ), void 0 !== t.attr( 'title' ) && '' !== c.attr( 'title' ) && ( d = ' title="' + t.attr( 'title' ) + '"' ), void 0 !== t.attr( 'class' ) && ( f = ' ' + t.attr( 'class' ), u = ' data-jqfs-class="' + t.attr( 'class' ) + '"' );
							var p = t.data();
							for (var v in p) {
								'' !== p[v] && ( r += ' data-' + v + '="' + p[v] + '"' );
							}
							i + f !== '' && ( o = ' class="' + i + f + '"' ), s = '<li' + u + r + o + d + a + '>' + t.html() + '</li>', t.parent().is( 'optgroup' ) && ( void 0 !== t.parent().attr( 'class' ) && ( h = ' ' + t.parent().attr( 'class' ) ), s = '<li' + u + r + ' class="' + i + f + ' option' + h + '"' + d + a + '>' + t.html() + '</li>', t.is( ':first-child' ) && ( s = '<li class="optgroup' + h + '">' + t.parent().attr( 'label' ) + '</li>' + s ) ), n += s;
						}
					}

					var c = e( 'option', i ),
						n = '';
					if (i.is( '[multiple]' )) {
						if (a || o) {
							return;
						}
						! function() {
							var s = new t,
								l = e( '<div class="jq-select-multiple jqselect"></div>' ).attr( {
									id: s.id,
									title: s.title
								} ).addClass( s.classes ).data( s.data );
							i.after( l ), r(), l.append( '<ul>' + n + '</ul>' );
							var o = e( 'ul', l ),
								a = e( 'li', l ),
								f = i.attr( 'size' ),
								h = o.outerHeight(),
								u = a.outerHeight();
							void 0 !== f && f > 0 ? o.css( {height: u * f} ) : o.css( {height: 4 * u} ), h > l.height() && ( o.css( 'overflowY', 'scroll' ), d( o ), a.filter( '.selected' ).length && o.scrollTop( o.scrollTop() + a.filter( '.selected' ).position().top ) ), i.prependTo( l ), i.is( ':disabled' ) ? ( l.addClass( 'disabled' ), c.each( function() {
								e( this ).is( ':selected' ) && a.eq( e( this ).index() ).addClass( 'selected' );
							} ) ) : ( a.filter( ':not(.disabled):not(.optgroup)' ).click( function( t ) {
								i.focus();
								var s = e( this );
								if (t.ctrlKey || t.metaKey || s.addClass( 'selected' ), t.shiftKey || s.addClass( 'first' ), t.ctrlKey || t.metaKey || t.shiftKey || s.siblings().removeClass( 'selected first' ), ( t.ctrlKey || t.metaKey ) && ( s.is( '.selected' ) ? s.removeClass( 'selected first' ) : s.addClass( 'selected first' ), s.siblings().removeClass( 'first' ) ), t.shiftKey) {
									var l = ! 1,
										o = ! 1;
									s.siblings().removeClass( 'selected' ).siblings( '.first' ).addClass( 'selected' ), s.prevAll().each( function() {
										e( this ).is( '.first' ) && ( l = ! 0 );
									} ), s.nextAll().each( function() {
										e( this ).is( '.first' ) && ( o = ! 0 );
									} ), l && s.prevAll().each( function() {
										if (e( this ).is( '.selected' )) {
											return ! 1;
										}
										e( this ).not( '.disabled, .optgroup' ).addClass( 'selected' );
									} ), o && s.nextAll().each( function() {
										if (e( this ).is( '.selected' )) {
											return ! 1;
										}
										e( this ).not( '.disabled, .optgroup' ).addClass( 'selected' );
									} ), 1 == a.filter( '.selected' ).length && s.addClass( 'first' );
								}
								c.prop( 'selected', ! 1 ), a.filter( '.selected' ).each( function() {
									var t = e( this ),
										s = t.index();
									t.is( '.option' ) && ( s -= t.prevAll( '.optgroup' ).length ), c.eq( s ).prop( 'selected', ! 0 );
								} ), i.change();
							} ), c.each( function( t ) {
								e( this ).data( 'optionIndex', t );
							} ), i.on( 'change.styler', function() {
								a.removeClass( 'selected' );
								var t = [];
								c.filter( ':selected' ).each( function() {
									t.push( e( this ).data( 'optionIndex' ) );
								} ), a.not( '.optgroup' ).filter( function( s ) {
									return e.inArray( s, t ) > -1;
								} ).addClass( 'selected' );
							} ).on( 'focus.styler', function() {
								l.addClass( 'focused' );
							} ).on( 'blur.styler', function() {
								l.removeClass( 'focused' );
							} ), h > l.height() && i.on( 'keydown.styler', function( e ) {
								38 != e.which && 37 != e.which && 33 != e.which || o.scrollTop( o.scrollTop() + a.filter( '.selected' ).position().top - u ), 40 != e.which && 39 != e.which && 34 != e.which || o.scrollTop( o.scrollTop() + a.filter( '.selected:last' ).position().top - o.innerHeight() + 2 * u );
							} ) );
						}();
					} else {
						! function() {
							var a = new t,
								f = '',
								h = i.data( 'placeholder' ),
								u = i.data( 'search' ),
								p = i.data( 'search-limit' ),
								v = i.data( 'search-not-found' ),
								m = i.data( 'search-placeholder' ),
								g = i.data( 'smart-positioning' );
							void 0 === h && ( h = l.selectPlaceholder ), void 0 !== u && '' !== u || ( u = l.selectSearch ), void 0 !== p && '' !== p || ( p = l.selectSearchLimit ), void 0 !== v && '' !== v || ( v = l.selectSearchNotFound ), void 0 === m && ( m = l.selectSearchPlaceholder ), void 0 !== g && '' !== g || ( g = l.selectSmartPositioning );
							var b = e( '<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>' ).attr( {
								id: a.id,
								title: a.title
							} ).addClass( a.classes ).data( a.data );
							i.after( b ).prependTo( b );
							var C = b.css( 'z-index' );
							C = C > 0 ? C : 1;
							var x = e( 'div.jq-selectbox__select', b ),
								y = e( 'div.jq-selectbox__select-text', b ),
								w = c.filter( ':selected' );
							r(), u && ( f = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + m + '"></div><div class="jq-selectbox__not-found">' + v + '</div>' );
							var q = e( '<div class="jq-selectbox__dropdown">' + f + '<ul>' + n + '</ul></div>' );
							b.append( q );
							var _ = e( 'ul', q ),
								j = e( 'li', q ),
								k = e( 'input', q ),
								S = e( 'div.jq-selectbox__not-found', q ).hide();
							j.length < p && k.parent().hide(), '' === c.first().text() && c.first().is( ':selected' ) && ! 1 !== h ? y.text( h ).addClass( 'placeholder' ) : y.text( w.text() );
							var T = 0,
								N = 0;
							if (j.css( {display: 'inline-block'} ), j.each( function() {
								var t = e( this );
								t.innerWidth() > T && ( T = t.innerWidth(), N = t.width() );
							} ), j.css( {display: ''} ), y.is( '.placeholder' ) && y.width() > T) {
								y.width( y.width() );
							} else {
								var P = b.clone().appendTo( 'body' ).width( 'auto' ),
									H = P.outerWidth();
								P.remove(), H == b.outerWidth() && y.width( N );
							}
							T > b.width() && q.width( T ), '' === c.first().text() && '' !== i.data( 'placeholder' ) && j.first().hide();
							var A = b.outerHeight( ! 0 ),
								D = k.parent().outerHeight( ! 0 ) || 0,
								I = _.css( 'max-height' ),
								K = j.filter( '.selected' );
							if (K.length < 1 && j.first().addClass( 'selected sel' ), void 0 === j.data( 'li-height' )) {
								var O = j.outerHeight();
								! 1 !== h && ( O = j.eq( 1 ).outerHeight() ), j.data( 'li-height', O );
							}
							var M = q.css( 'top' );
							if ('auto' == q.css( 'left' ) && q.css( {left: 0} ), 'auto' == q.css( 'top' ) && ( q.css( {top: A} ), M = A ), q.hide(), K.length && ( c.first().text() != w.text() && b.addClass( 'changed' ), b.data( 'jqfs-class', K.data( 'jqfs-class' ) ), b.addClass( K.data( 'jqfs-class' ) ) ), i.is( ':disabled' )) {
								return b.addClass( 'disabled' ), ! 1;
							}
							x.click( function() {
								if (e( 'div.jq-selectbox' ).filter( '.opened' ).length && l.onSelectClosed.call( e( 'div.jq-selectbox' ).filter( '.opened' ) ), i.focus(), ! o) {
									var t = e( window ),
										s = j.data( 'li-height' ),
										a = b.offset().top,
										r = t.height() - A - ( a - t.scrollTop() ),
										n = i.data( 'visible-options' );
									void 0 !== n && '' !== n || ( n = l.selectVisibleOptions );
									var f = 5 * s,
										h = s * n;
									n > 0 && n < 6 && ( f = h ), 0 === n && ( h = 'auto' );
									var u = function() {
										q.height( 'auto' ).css( {bottom: 'auto', top: M} );
										var e = function() {
											_.css( 'max-height', Math.floor( ( r - 20 - D ) / s ) * s );
										};
										e(), _.css( 'max-height', h ), 'none' != I && _.css( 'max-height', I ), r < q.outerHeight() + 20 && e();
									};
									! 0 === g || 1 === g ? r > f + D + 20 ? ( u(), b.removeClass( 'dropup' ).addClass( 'dropdown' ) ) : ( function() {
										q.height( 'auto' ).css( {top: 'auto', bottom: M} );
										var e = function() {
											_.css( 'max-height', Math.floor( ( a - t.scrollTop() - 20 - D ) / s ) * s );
										};
										e(), _.css( 'max-height', h ), 'none' != I && _.css( 'max-height', I ), a - t.scrollTop() - 20 < q.outerHeight() + 20 && e();
									}(), b.removeClass( 'dropdown' ).addClass( 'dropup' ) ) : ! 1 === g || 0 === g ? r > f + D + 20 && ( u(), b.removeClass( 'dropup' ).addClass( 'dropdown' ) ) : ( q.height( 'auto' ).css( {
										bottom: 'auto',
										top: M
									} ), _.css( 'max-height', h ), 'none' != I && _.css( 'max-height', I ) ), b.offset().left + q.outerWidth() > t.width() && q.css( {
										left: 'auto',
										right: 0
									} ), e( 'div.jqselect' ).css( {zIndex: C - 1} ).removeClass( 'opened' ), b.css( {zIndex: C} ), q.is( ':hidden' ) ? ( e( 'div.jq-selectbox__dropdown:visible' ).hide(), q.show(), b.addClass( 'opened focused' ), l.onSelectOpened.call( b ) ) : ( q.hide(), b.removeClass( 'opened dropup dropdown' ), e( 'div.jq-selectbox' ).filter( '.opened' ).length && l.onSelectClosed.call( b ) ), k.length && ( k.val( '' ).keyup(), S.hide(), k.keyup( function() {
										var t = e( this ).val();
										j.each( function() {
											e( this ).html().match( new RegExp( '.*?' + t + '.*?', 'i' ) ) ? e( this ).show() : e( this ).hide();
										} ), '' === c.first().text() && '' !== i.data( 'placeholder' ) && j.first().hide(), j.filter( ':visible' ).length < 1 ? S.show() : S.hide();
									} ) ), j.filter( '.selected' ).length && ( '' === i.val() ? _.scrollTop( 0 ) : ( _.innerHeight() / s % 2 != 0 && ( s /= 2 ), _.scrollTop( _.scrollTop() + j.filter( '.selected' ).position().top - _.innerHeight() / 2 + s ) ) ), d( _ );
								}
							} ), j.hover( function() {
								e( this ).siblings().removeClass( 'selected' );
							} );
							var W = j.filter( '.selected' ).text();
							j.filter( ':not(.disabled):not(.optgroup)' ).click( function() {
								i.focus();
								var t = e( this ),
									s = t.text();
								if (! t.is( '.selected' )) {
									var o = t.index();
									o -= t.prevAll( '.optgroup' ).length, t.addClass( 'selected sel' ).siblings().removeClass( 'selected sel' ), c.prop( 'selected', ! 1 ).eq( o ).prop( 'selected', ! 0 ), W = s, y.text( s ), b.data( 'jqfs-class' ) && b.removeClass( b.data( 'jqfs-class' ) ), b.data( 'jqfs-class', t.data( 'jqfs-class' ) ), b.addClass( t.data( 'jqfs-class' ) ), i.change();
								}
								q.hide(), b.removeClass( 'opened dropup dropdown' ), l.onSelectClosed.call( b );
							} ), q.mouseout( function() {
								e( 'li.sel', q ).addClass( 'selected' );
							} ), i.on( 'change.styler', function() {
								y.text( c.filter( ':selected' ).text() ).removeClass( 'placeholder' ), j.removeClass( 'selected sel' ).not( '.optgroup' ).eq( i[0].selectedIndex ).addClass( 'selected sel' ), c.first().text() != j.filter( '.selected' ).text() ? b.addClass( 'changed' ) : b.removeClass( 'changed' );
							} ).on( 'focus.styler', function() {
								b.addClass( 'focused' ), e( 'div.jqselect' ).not( '.focused' ).removeClass( 'opened dropup dropdown' ).find( 'div.jq-selectbox__dropdown' ).hide();
							} ).on( 'blur.styler', function() {
								b.removeClass( 'focused' );
							} ).on( 'keydown.styler keyup.styler', function( e ) {
								var t = j.data( 'li-height' );
								'' === i.val() ? y.text( h ).addClass( 'placeholder' ) : y.text( c.filter( ':selected' ).text() ), j.removeClass( 'selected sel' ).not( '.optgroup' ).eq( i[0].selectedIndex ).addClass( 'selected sel' ), 38 != e.which && 37 != e.which && 33 != e.which && 36 != e.which || ( '' === i.val() ? _.scrollTop( 0 ) : _.scrollTop( _.scrollTop() + j.filter( '.selected' ).position().top ) ), 40 != e.which && 39 != e.which && 34 != e.which && 35 != e.which || _.scrollTop( _.scrollTop() + j.filter( '.selected' ).position().top - _.innerHeight() + t ), 13 == e.which && ( e.preventDefault(), q.hide(), b.removeClass( 'opened dropup dropdown' ), l.onSelectClosed.call( b ) );
							} ).on( 'keydown.styler', function( e ) {
								32 == e.which && ( e.preventDefault(), x.click() );
							} ), s.registered || ( e( document ).on( 'click', s ), s.registered = ! 0 );
						}();
					}
				};
				f(), i.on( 'refresh', function() {
					i.off( '.styler' ).parent().before( i ).remove(), f();
				} );
			} else {
				i.is( ':reset' ) && i.on( 'click', function() {
					setTimeout( function() {
						i.closest( 'form' ).find( 'input, select' ).trigger( 'refresh' );
					}, 1 );
				} );
			}
		}, destroy: function() {
			var t = e( this.element );
			t.is( ':checkbox' ) || t.is( ':radio' ) ? ( t.removeData( '_' + i ).off( '.styler refresh' ).removeAttr( 'style' ).parent().before( t ).remove(), t.closest( 'label' ).add( 'label[for="' + t.attr( 'id' ) + '"]' ).off( '.styler' ) ) : t.is( 'input[type="number"]' ) ? t.removeData( '_' + i ).off( '.styler refresh' ).closest( '.jq-number' ).before( t ).remove() : ( t.is( ':file' ) || t.is( 'select' ) ) && t.removeData( '_' + i ).off( '.styler refresh' ).removeAttr( 'style' ).parent().before( t ).remove();
		}
	}, e.fn[i] = function( s ) {
		var l = arguments;
		if (void 0 === s || 'object' == typeof s) {
			return this.each( function() {
				e.data( this, '_' + i ) || e.data( this, '_' + i, new t( this, s ) );
			} ).promise().done( function() {
				var t = e( this[0] ).data( '_' + i );
				t && t.options.onFormStyled.call();
			} ), this;
		}
		if ('string' == typeof s && '_' !== s[0] && 'init' !== s) {
			var o;
			return this.each( function() {
				var a = e.data( this, '_' + i );
				a instanceof t && 'function' == typeof a[s] && ( o = a[s].apply( a, Array.prototype.slice.call( l, 1 ) ) );
			} ), void 0 !== o ? o : this;
		}
	}, s.registered = ! 1;
} );

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
! function( a ) {
	'function' == typeof define && define.amd ? define( [ 'jquery' ], a ) : a( 'object' == typeof exports ? require( 'jquery' ) : window.jQuery || window.Zepto );
}( function( a ) {
	var b,
		c,
		d,
		e,
		f,
		g,
		h = 'Close',
		i = 'BeforeClose',
		j = 'AfterClose',
		k = 'BeforeAppend',
		l = 'MarkupParse',
		m = 'Open',
		n = 'Change',
		o = 'mfp',
		p = '.' + o,
		q = 'mfp-ready',
		r = 'mfp-removing',
		s = 'mfp-prevent-close',
		t = function() {
		},
		u = !! window.jQuery,
		v = a( window ),
		w = function( a, c ) {
			b.ev.on( o + a + p, c );
		},
		x = function( b, c, d, e ) {
			var f = document.createElement( 'div' );
			return f.className = 'mfp-' + b, d && ( f.innerHTML = d ), e ? c && c.appendChild( f ) : ( f = a( f ), c && f.appendTo( c ) ), f;
		},
		y = function( c, d ) {
			b.ev.triggerHandler( o + c, d ), b.st.callbacks && ( c = c.charAt( 0 ).toLowerCase() + c.slice( 1 ), b.st.callbacks[c] && b.st.callbacks[c].apply( b, a.isArray( d ) ? d : [ d ] ) );
		},
		z = function( c ) {
			return c === g && b.currTemplate.closeBtn || ( b.currTemplate.closeBtn = a( b.st.closeMarkup.replace( '%title%', b.st.tClose ) ), g = c ), b.currTemplate.closeBtn;
		},
		A = function() {
			a.magnificPopup.instance || ( b = new t, b.init(), a.magnificPopup.instance = b );
		},
		B = function() {
			var a = document.createElement( 'p' ).style,
				b = [ 'ms', 'O', 'Moz', 'Webkit' ];
			if (void 0 !== a.transition) {
				return ! 0;
			}
			for (; b.length;) {
				if (b.pop() + 'Transition' in a) {
					return ! 0;
				}
			}
			return ! 1;
		};
	t.prototype = {
		constructor: t, init: function() {
			var c = navigator.appVersion;
			b.isLowIE = b.isIE8 = document.all && ! document.addEventListener, b.isAndroid = /android/gi.test( c ), b.isIOS = /iphone|ipad|ipod/gi.test( c ), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test( navigator.userAgent ), d = a( document ), b.popupsCache = {};
		}, open: function( c ) {
			var e;
			if (c.isObj === ! 1) {
				b.items = c.items.toArray(), b.index = 0;
				var g,
					h = c.items;
				for (e = 0; e < h.length; e++) {
					if (g = h[e], g.parsed && ( g = g.el[0] ), g === c.el[0]) {
						b.index = e;
						break;
					}
				}
			} else {
				b.items = a.isArray( c.items ) ? c.items : [ c.items ], b.index = c.index || 0;
			}
			if (b.isOpen) {
				return void b.updateItemHTML();
			}
			b.types = [], f = '', c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq( 0 ) : b.ev = d, c.key ? ( b.popupsCache[c.key] || ( b.popupsCache[c.key] = {} ), b.currTemplate = b.popupsCache[c.key] ) : b.currTemplate = {}, b.st = a.extend( ! 0, {}, a.magnificPopup.defaults, c ), b.fixedContentPos = 'auto' === b.st.fixedContentPos ? ! b.probablyMobile : b.st.fixedContentPos, b.st.modal && ( b.st.closeOnContentClick = ! 1, b.st.closeOnBgClick = ! 1, b.st.showCloseBtn = ! 1, b.st.enableEscapeKey = ! 1 ), b.bgOverlay || ( b.bgOverlay = x( 'bg' ).on( 'click' + p, function() {
				b.close();
			} ), b.wrap = x( 'wrap' ).attr( 'tabindex', -1 ).on( 'click' + p, function( a ) {
				b._checkIfClose( a.target ) && b.close();
			} ), b.container = x( 'container', b.wrap ) ), b.contentContainer = x( 'content' ), b.st.preloader && ( b.preloader = x( 'preloader', b.container, b.st.tLoading ) );
			var i = a.magnificPopup.modules;
			for (e = 0; e < i.length; e++) {
				var j = i[e];
				j = j.charAt( 0 ).toUpperCase() + j.slice( 1 ), b['init' + j].call( b );
			}
			y( 'BeforeOpen' ), b.st.showCloseBtn && ( b.st.closeBtnInside ? ( w( l, function( a, b, c, d ) {
				c.close_replaceWith = z( d.type );
			} ), f += ' mfp-close-btn-in' ) : b.wrap.append( z() ) ), b.st.alignTop && ( f += ' mfp-align-top' ), b.fixedContentPos ? b.wrap.css( {
				overflow: b.st.overflowY,
				overflowX: 'hidden',
				overflowY: b.st.overflowY
			} ) : b.wrap.css( {
				top: v.scrollTop(),
				position: 'absolute'
			} ), ( b.st.fixedBgPos === ! 1 || 'auto' === b.st.fixedBgPos && ! b.fixedContentPos ) && b.bgOverlay.css( {
				height: d.height(),
				position: 'absolute'
			} ), b.st.enableEscapeKey && d.on( 'keyup' + p, function( a ) {
				27 === a.keyCode && b.close();
			} ), v.on( 'resize' + p, function() {
				b.updateSize();
			} ), b.st.closeOnContentClick || ( f += ' mfp-auto-cursor' ), f && b.wrap.addClass( f );
			var k = b.wH = v.height(),
				n = {};
			if (b.fixedContentPos && b._hasScrollBar( k )) {
				var o = b._getScrollbarSize();
				o && ( n.marginRight = o );
			}
			b.fixedContentPos && ( b.isIE7 ? a( 'body, html' ).css( 'overflow', 'hidden' ) : n.overflow = 'hidden' );
			var r = b.st.mainClass;
			return b.isIE7 && ( r += ' mfp-ie7' ), r && b._addClassToMFP( r ), b.updateItemHTML(), y( 'BuildControls' ), a( 'html' ).css( n ), b.bgOverlay.add( b.wrap ).prependTo( b.st.prependTo || a( document.body ) ), b._lastFocusedEl = document.activeElement, setTimeout( function() {
				b.content ? ( b._addClassToMFP( q ), b._setFocus() ) : b.bgOverlay.addClass( q ), d.on( 'focusin' + p, b._onFocusIn );
			}, 16 ), b.isOpen = ! 0, b.updateSize( k ), y( m ), c;
		}, close: function() {
			b.isOpen && ( y( i ), b.isOpen = ! 1, b.st.removalDelay && ! b.isLowIE && b.supportsTransition ? ( b._addClassToMFP( r ), setTimeout( function() {
				b._close();
			}, b.st.removalDelay ) ) : b._close() );
		}, _close: function() {
			y( h );
			var c = r + ' ' + q + ' ';
			if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && ( c += b.st.mainClass + ' ' ), b._removeClassFromMFP( c ), b.fixedContentPos) {
				var e = {marginRight: ''};
				b.isIE7 ? a( 'body, html' ).css( 'overflow', '' ) : e.overflow = '', a( 'html' ).css( e );
			}
			d.off( 'keyup' + p + ' focusin' + p ), b.ev.off( p ), b.wrap.attr( 'class', 'mfp-wrap' ).removeAttr( 'style' ), b.bgOverlay.attr( 'class', 'mfp-bg' ), b.container.attr( 'class', 'mfp-container' ), ! b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== ! 0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a( b._lastFocusedEl ).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y( j );
		}, updateSize: function( a ) {
			if (b.isIOS) {
				var c = document.documentElement.clientWidth / window.innerWidth,
					d = window.innerHeight * c;
				b.wrap.css( 'height', d ), b.wH = d;
			} else {
				b.wH = a || v.height();
			}
			b.fixedContentPos || b.wrap.css( 'height', b.wH ), y( 'Resize' );
		}, updateItemHTML: function() {
			var c = b.items[b.index];
			b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || ( c = b.parseEl( b.index ) );
			var d = c.type;
			if (y( 'BeforeChange', [ b.currItem ? b.currItem.type : '', d ] ), b.currItem = c, ! b.currTemplate[d]) {
				var f = b.st[d] ? b.st[d].markup : ! 1;
				y( 'FirstMarkupParse', f ), f ? b.currTemplate[d] = a( f ) : b.currTemplate[d] = ! 0;
			}
			e && e !== c.type && b.container.removeClass( 'mfp-' + e + '-holder' );
			var g = b['get' + d.charAt( 0 ).toUpperCase() + d.slice( 1 )]( c, b.currTemplate[d] );
			b.appendContent( g, d ), c.preloaded = ! 0, y( n, c ), e = c.type, b.container.prepend( b.contentContainer ), y( 'AfterChange' );
		}, appendContent: function( a, c ) {
			b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === ! 0 ? b.content.find( '.mfp-close' ).length || b.content.append( z() ) : b.content = a : b.content = '', y( k ), b.container.addClass( 'mfp-' + c + '-holder' ), b.contentContainer.append( b.content );
		}, parseEl: function( c ) {
			var d,
				e = b.items[c];
			if (e.tagName ? e = {el: a( e )} : ( d = e.type, e = {data: e, src: e.src} ), e.el) {
				for (var f = b.types, g = 0; g < f.length; g++) {
					if (e.el.hasClass( 'mfp-' + f[g] )) {
						d = f[g];
						break;
					}
				}
				e.src = e.el.attr( 'data-mfp-src' ), e.src || ( e.src = e.el.attr( 'href' ) );
			}
			return e.type = d || b.st.type || 'inline', e.index = c, e.parsed = ! 0, b.items[c] = e, y( 'ElementParse', e ), b.items[c];
		}, addGroup: function( a, c ) {
			var d = function( d ) {
				d.mfpEl = this, b._openClick( d, a, c );
			};
			c || ( c = {} );
			var e = 'click.magnificPopup';
			c.mainEl = a, c.items ? ( c.isObj = ! 0, a.off( e ).on( e, d ) ) : ( c.isObj = ! 1, c.delegate ? a.off( e ).on( e, c.delegate, d ) : ( c.items = a, a.off( e ).on( e, d ) ) );
		}, _openClick: function( c, d, e ) {
			var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
			if (f || ! ( 2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey )) {
				var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
				if (g) {
					if (a.isFunction( g )) {
						if (! g.call( b )) {
							return ! 0;
						}
					} else if (v.width() < g) {
						return ! 0;
					}
				}
				c.type && ( c.preventDefault(), b.isOpen && c.stopPropagation() ), e.el = a( c.mfpEl ), e.delegate && ( e.items = d.find( e.delegate ) ), b.open( e );
			}
		}, updateStatus: function( a, d ) {
			if (b.preloader) {
				c !== a && b.container.removeClass( 'mfp-s-' + c ), d || 'loading' !== a || ( d = b.st.tLoading );
				var e = {status: a, text: d};
				y( 'UpdateStatus', e ), a = e.status, d = e.text, b.preloader.html( d ), b.preloader.find( 'a' ).on( 'click', function( a ) {
					a.stopImmediatePropagation();
				} ), b.container.addClass( 'mfp-s-' + a ), c = a;
			}
		}, _checkIfClose: function( c ) {
			if (! a( c ).hasClass( s )) {
				var d = b.st.closeOnContentClick,
					e = b.st.closeOnBgClick;
				if (d && e) {
					return ! 0;
				}
				if (! b.content || a( c ).hasClass( 'mfp-close' ) || b.preloader && c === b.preloader[0]) {
					return ! 0;
				}
				if (c === b.content[0] || a.contains( b.content[0], c )) {
					if (d) {
						return ! 0;
					}
				} else if (e && a.contains( document, c )) {
					return ! 0;
				}
				return ! 1;
			}
		}, _addClassToMFP: function( a ) {
			b.bgOverlay.addClass( a ), b.wrap.addClass( a );
		}, _removeClassFromMFP: function( a ) {
			this.bgOverlay.removeClass( a ), b.wrap.removeClass( a );
		}, _hasScrollBar: function( a ) {
			return ( b.isIE7 ? d.height() : document.body.scrollHeight ) > ( a || v.height() );
		}, _setFocus: function() {
			( b.st.focus ? b.content.find( b.st.focus ).eq( 0 ) : b.wrap ).focus();
		}, _onFocusIn: function( c ) {
			return c.target === b.wrap[0] || a.contains( b.wrap[0], c.target ) ? void 0 : ( b._setFocus(), ! 1 );
		}, _parseMarkup: function( b, c, d ) {
			var e;
			d.data && ( c = a.extend( d.data, c ) ), y( l, [ b, c, d ] ), a.each( c, function( c, d ) {
				if (void 0 === d || d === ! 1) {
					return ! 0;
				}
				if (e = c.split( '_' ), e.length > 1) {
					var f = b.find( p + '-' + e[0] );
					if (f.length > 0) {
						var g = e[1];
						'replaceWith' === g ? f[0] !== d[0] && f.replaceWith( d ) : 'img' === g ? f.is( 'img' ) ? f.attr( 'src', d ) : f.replaceWith( a( '<img>' ).attr( 'src', d ).attr( 'class', f.attr( 'class' ) ) ) : f.attr( e[1], d );
					}
				} else {
					b.find( p + '-' + c ).html( d );
				}
			} );
		}, _getScrollbarSize: function() {
			if (void 0 === b.scrollbarSize) {
				var a = document.createElement( 'div' );
				a.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;', document.body.appendChild( a ), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild( a );
			}
			return b.scrollbarSize;
		}
	}, a.magnificPopup = {
		instance: null,
		proto: t.prototype,
		modules: [],
		open: function( b, c ) {
			return A(), b = b ? a.extend( ! 0, {}, b ) : {}, b.isObj = ! 0, b.index = c || 0, this.instance.open( b );
		},
		close: function() {
			return a.magnificPopup.instance && a.magnificPopup.instance.close();
		},
		registerModule: function( b, c ) {
			c.options && ( a.magnificPopup.defaults[b] = c.options ), a.extend( this.proto, c.proto ), this.modules.push( b );
		},
		defaults: {
			disableOn: 0,
			key: null,
			midClick: ! 1,
			mainClass: '',
			preloader: ! 0,
			focus: '',
			closeOnContentClick: ! 1,
			closeOnBgClick: ! 0,
			closeBtnInside: ! 0,
			showCloseBtn: ! 0,
			enableEscapeKey: ! 0,
			modal: ! 1,
			alignTop: ! 1,
			removalDelay: 0,
			prependTo: null,
			fixedContentPos: 'auto',
			fixedBgPos: 'auto',
			overflowY: 'auto',
			closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
			tClose: 'Close (Esc)',
			tLoading: 'Loading...',
			autoFocusLast: ! 0
		}
	}, a.fn.magnificPopup = function( c ) {
		A();
		var d = a( this );
		if ('string' == typeof c) {
			if ('open' === c) {
				var e,
					f = u ? d.data( 'magnificPopup' ) : d[0].magnificPopup,
					g = parseInt( arguments[1], 10 ) || 0;
				f.items ? e = f.items[g] : ( e = d, f.delegate && ( e = e.find( f.delegate ) ), e = e.eq( g ) ), b._openClick( {mfpEl: e}, d, f );
			} else {
				b.isOpen && b[c].apply( b, Array.prototype.slice.call( arguments, 1 ) );
			}
		} else {
			c = a.extend( ! 0, {}, c ), u ? d.data( 'magnificPopup', c ) : d[0].magnificPopup = c, b.addGroup( d, c );
		}
		return d;
	};
	var C,
		D,
		E,
		F = 'inline',
		G = function() {
			E && ( D.after( E.addClass( C ) ).detach(), E = null );
		};
	a.magnificPopup.registerModule( F, {
		options: {hiddenClass: 'hide', markup: '', tNotFound: 'Content not found'},
		proto: {
			initInline: function() {
				b.types.push( F ), w( h + '.' + F, function() {
					G();
				} );
			}, getInline: function( c, d ) {
				if (G(), c.src) {
					var e = b.st.inline,
						f = a( c.src );
					if (f.length) {
						var g = f[0].parentNode;
						g && g.tagName && ( D || ( C = e.hiddenClass, D = x( C ), C = 'mfp-' + C ), E = f.after( D ).detach().removeClass( C ) ), b.updateStatus( 'ready' );
					} else {
						b.updateStatus( 'error', e.tNotFound ), f = a( '<div>' );
					}
					return c.inlineElement = f, f;
				}
				return b.updateStatus( 'ready' ), b._parseMarkup( d, {}, c ), d;
			}
		}
	} );
	var H,
		I = 'ajax',
		J = function() {
			H && a( document.body ).removeClass( H );
		},
		K = function() {
			J(), b.req && b.req.abort();
		};
	a.magnificPopup.registerModule( I, {
		options: {
			settings: null,
			cursor: 'mfp-ajax-cur',
			tError: '<a href="%url%">The content</a> could not be loaded.'
		}, proto: {
			initAjax: function() {
				b.types.push( I ), H = b.st.ajax.cursor, w( h + '.' + I, K ), w( 'BeforeChange.' + I, K );
			}, getAjax: function( c ) {
				H && a( document.body ).addClass( H ), b.updateStatus( 'loading' );
				var d = a.extend( {
					url: c.src, success: function( d, e, f ) {
						var g = {data: d, xhr: f};
						y( 'ParseAjax', g ), b.appendContent( a( g.data ), I ), c.finished = ! 0, J(), b._setFocus(), setTimeout( function() {
							b.wrap.addClass( q );
						}, 16 ), b.updateStatus( 'ready' ), y( 'AjaxContentAdded' );
					}, error: function() {
						J(), c.finished = c.loadError = ! 0, b.updateStatus( 'error', b.st.ajax.tError.replace( '%url%', c.src ) );
					}
				}, b.st.ajax.settings );
				return b.req = a.ajax( d ), '';
			}
		}
	} );
	var L,
		M = function( c ) {
			if (c.data && void 0 !== c.data.title) {
				return c.data.title;
			}
			var d = b.st.image.titleSrc;
			if (d) {
				if (a.isFunction( d )) {
					return d.call( b, c );
				}
				if (c.el) {
					return c.el.attr( d ) || '';
				}
			}
			return '';
		};
	a.magnificPopup.registerModule( 'image', {
		options: {
			markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
			cursor: 'mfp-zoom-out-cur',
			titleSrc: 'title',
			verticalFit: ! 0,
			tError: '<a href="%url%">The image</a> could not be loaded.'
		}, proto: {
			initImage: function() {
				var c = b.st.image,
					d = '.image';
				b.types.push( 'image' ), w( m + d, function() {
					'image' === b.currItem.type && c.cursor && a( document.body ).addClass( c.cursor );
				} ), w( h + d, function() {
					c.cursor && a( document.body ).removeClass( c.cursor ), v.off( 'resize' + p );
				} ), w( 'Resize' + d, b.resizeImage ), b.isLowIE && w( 'AfterChange', b.resizeImage );
			}, resizeImage: function() {
				var a = b.currItem;
				if (a && a.img && b.st.image.verticalFit) {
					var c = 0;
					b.isLowIE && ( c = parseInt( a.img.css( 'padding-top' ), 10 ) + parseInt( a.img.css( 'padding-bottom' ), 10 ) ), a.img.css( 'max-height', b.wH - c );
				}
			}, _onImageHasSize: function( a ) {
				a.img && ( a.hasSize = ! 0, L && clearInterval( L ), a.isCheckingImgSize = ! 1, y( 'ImageHasSize', a ), a.imgHidden && ( b.content && b.content.removeClass( 'mfp-loading' ), a.imgHidden = ! 1 ) );
			}, findImageSize: function( a ) {
				var c = 0,
					d = a.img[0],
					e = function( f ) {
						L && clearInterval( L ), L = setInterval( function() {
							return d.naturalWidth > 0 ? void b._onImageHasSize( a ) : ( c > 200 && clearInterval( L ), c++, void ( 3 === c ? e( 10 ) : 40 === c ? e( 50 ) : 100 === c && e( 500 ) ) );
						}, f );
					};
				e( 1 );
			}, getImage: function( c, d ) {
				var e = 0,
					f = function() {
						c && ( c.img[0].complete ? ( c.img.off( '.mfploader' ), c === b.currItem && ( b._onImageHasSize( c ), b.updateStatus( 'ready' ) ), c.hasSize = ! 0, c.loaded = ! 0, y( 'ImageLoadComplete' ) ) : ( e++, 200 > e ? setTimeout( f, 100 ) : g() ) );
					},
					g = function() {
						c && ( c.img.off( '.mfploader' ), c === b.currItem && ( b._onImageHasSize( c ), b.updateStatus( 'error', h.tError.replace( '%url%', c.src ) ) ), c.hasSize = ! 0, c.loaded = ! 0, c.loadError = ! 0 );
					},
					h = b.st.image,
					i = d.find( '.mfp-img' );
				if (i.length) {
					var j = document.createElement( 'img' );
					j.className = 'mfp-img', c.el && c.el.find( 'img' ).length && ( j.alt = c.el.find( 'img' ).attr( 'alt' ) ), c.img = a( j ).on( 'load.mfploader', f ).on( 'error.mfploader', g ), j.src = c.src, i.is( 'img' ) && ( c.img = c.img.clone() ), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = ! 0 : j.width || ( c.hasSize = ! 1 );
				}
				return b._parseMarkup( d, {
					title: M( c ),
					img_replaceWith: c.img
				}, c ), b.resizeImage(), c.hasSize ? ( L && clearInterval( L ), c.loadError ? ( d.addClass( 'mfp-loading' ), b.updateStatus( 'error', h.tError.replace( '%url%', c.src ) ) ) : ( d.removeClass( 'mfp-loading' ), b.updateStatus( 'ready' ) ), d ) : ( b.updateStatus( 'loading' ), c.loading = ! 0, c.hasSize || ( c.imgHidden = ! 0, d.addClass( 'mfp-loading' ), b.findImageSize( c ) ), d );
			}
		}
	} );
	var N,
		O = function() {
			return void 0 === N && ( N = void 0 !== document.createElement( 'p' ).style.MozTransform ), N;
		};
	a.magnificPopup.registerModule( 'zoom', {
		options: {
			enabled: ! 1, easing: 'ease-in-out', duration: 300, opener: function( a ) {
				return a.is( 'img' ) ? a : a.find( 'img' );
			}
		}, proto: {
			initZoom: function() {
				var a,
					c = b.st.zoom,
					d = '.zoom';
				if (c.enabled && b.supportsTransition) {
					var e,
						f,
						g = c.duration,
						j = function( a ) {
							var b = a.clone().removeAttr( 'style' ).removeAttr( 'class' ).addClass( 'mfp-animated-image' ),
								d = 'all ' + c.duration / 1e3 + 's ' + c.easing,
								e = {
									position: 'fixed',
									zIndex: 9999,
									left: 0,
									top: 0,
									'-webkit-backface-visibility': 'hidden'
								},
								f = 'transition';
							return e['-webkit-' + f] = e['-moz-' + f] = e['-o-' + f] = e[f] = d, b.css( e ), b;
						},
						k = function() {
							b.content.css( 'visibility', 'visible' );
						};
					w( 'BuildControls' + d, function() {
						if (b._allowZoom()) {
							if (clearTimeout( e ), b.content.css( 'visibility', 'hidden' ), a = b._getItemToZoom(), ! a) {
								return void k();
							}
							f = j( a ), f.css( b._getOffset() ), b.wrap.append( f ), e = setTimeout( function() {
								f.css( b._getOffset( ! 0 ) ), e = setTimeout( function() {
									k(), setTimeout( function() {
										f.remove(), a = f = null, y( 'ZoomAnimationEnded' );
									}, 16 );
								}, g );
							}, 16 );
						}
					} ), w( i + d, function() {
						if (b._allowZoom()) {
							if (clearTimeout( e ), b.st.removalDelay = g, ! a) {
								if (a = b._getItemToZoom(), ! a) {
									return;
								}
								f = j( a );
							}
							f.css( b._getOffset( ! 0 ) ), b.wrap.append( f ), b.content.css( 'visibility', 'hidden' ), setTimeout( function() {
								f.css( b._getOffset() );
							}, 16 );
						}
					} ), w( h + d, function() {
						b._allowZoom() && ( k(), f && f.remove(), a = null );
					} );
				}
			}, _allowZoom: function() {
				return 'image' === b.currItem.type;
			}, _getItemToZoom: function() {
				return b.currItem.hasSize ? b.currItem.img : ! 1;
			}, _getOffset: function( c ) {
				var d;
				d = c ? b.currItem.img : b.st.zoom.opener( b.currItem.el || b.currItem );
				var e = d.offset(),
					f = parseInt( d.css( 'padding-top' ), 10 ),
					g = parseInt( d.css( 'padding-bottom' ), 10 );
				e.top -= a( window ).scrollTop() - f;
				var h = {width: d.width(), height: ( u ? d.innerHeight() : d[0].offsetHeight ) - g - f};
				return O() ? h['-moz-transform'] = h.transform = 'translate(' + e.left + 'px,' + e.top + 'px)' : ( h.left = e.left, h.top = e.top ), h;
			}
		}
	} );
	var P = 'iframe',
		Q = '//about:blank',
		R = function( a ) {
			if (b.currTemplate[P]) {
				var c = b.currTemplate[P].find( 'iframe' );
				c.length && ( a || ( c[0].src = Q ), b.isIE8 && c.css( 'display', a ? 'block' : 'none' ) );
			}
		};
	a.magnificPopup.registerModule( P, {
		options: {
			markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
			srcAction: 'iframe_src',
			patterns: {
				youtube: {index: 'youtube.com', id: 'v=', src: '//www.youtube.com/embed/%id%?autoplay=1'},
				vimeo: {index: 'vimeo.com/', id: '/', src: '//player.vimeo.com/video/%id%?autoplay=1'},
				gmaps: {index: '//maps.google.', src: '%id%&output=embed'}
			}
		}, proto: {
			initIframe: function() {
				b.types.push( P ), w( 'BeforeChange', function( a, b, c ) {
					b !== c && ( b === P ? R() : c === P && R( ! 0 ) );
				} ), w( h + '.' + P, function() {
					R();
				} );
			}, getIframe: function( c, d ) {
				var e = c.src,
					f = b.st.iframe;
				a.each( f.patterns, function() {
					return e.indexOf( this.index ) > -1 ? ( this.id && ( e = 'string' == typeof this.id ? e.substr( e.lastIndexOf( this.id ) + this.id.length, e.length ) : this.id.call( this, e ) ), e = this.src.replace( '%id%', e ), ! 1 ) : void 0;
				} );
				var g = {};
				return f.srcAction && ( g[f.srcAction] = e ), b._parseMarkup( d, g, c ), b.updateStatus( 'ready' ), d;
			}
		}
	} );
	var S = function( a ) {
			var c = b.items.length;
			return a > c - 1 ? a - c : 0 > a ? c + a : a;
		},
		T = function( a, b, c ) {
			return a.replace( /%curr%/gi, b + 1 ).replace( /%total%/gi, c );
		};
	a.magnificPopup.registerModule( 'gallery', {
		options: {
			enabled: ! 1,
			arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
			preload: [ 0, 2 ],
			navigateByImgClick: ! 0,
			arrows: ! 0,
			tPrev: 'Previous (Left arrow key)',
			tNext: 'Next (Right arrow key)',
			tCounter: '%curr% of %total%'
		}, proto: {
			initGallery: function() {
				var c = b.st.gallery,
					e = '.mfp-gallery';
				return b.direction = ! 0, c && c.enabled ? ( f += ' mfp-gallery', w( m + e, function() {
					c.navigateByImgClick && b.wrap.on( 'click' + e, '.mfp-img', function() {
						return b.items.length > 1 ? ( b.next(), ! 1 ) : void 0;
					} ), d.on( 'keydown' + e, function( a ) {
						37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
					} );
				} ), w( 'UpdateStatus' + e, function( a, c ) {
					c.text && ( c.text = T( c.text, b.currItem.index, b.items.length ) );
				} ), w( l + e, function( a, d, e, f ) {
					var g = b.items.length;
					e.counter = g > 1 ? T( c.tCounter, f.index, g ) : '';
				} ), w( 'BuildControls' + e, function() {
					if (b.items.length > 1 && c.arrows && ! b.arrowLeft) {
						var d = c.arrowMarkup,
							e = b.arrowLeft = a( d.replace( /%title%/gi, c.tPrev ).replace( /%dir%/gi, 'left' ) ).addClass( s ),
							f = b.arrowRight = a( d.replace( /%title%/gi, c.tNext ).replace( /%dir%/gi, 'right' ) ).addClass( s );
						e.click( function() {
							b.prev();
						} ), f.click( function() {
							b.next();
						} ), b.container.append( e.add( f ) );
					}
				} ), w( n + e, function() {
					b._preloadTimeout && clearTimeout( b._preloadTimeout ), b._preloadTimeout = setTimeout( function() {
						b.preloadNearbyImages(), b._preloadTimeout = null;
					}, 16 );
				} ), void w( h + e, function() {
					d.off( e ), b.wrap.off( 'click' + e ), b.arrowRight = b.arrowLeft = null;
				} ) ) : ! 1;
			}, next: function() {
				b.direction = ! 0, b.index = S( b.index + 1 ), b.updateItemHTML();
			}, prev: function() {
				b.direction = ! 1, b.index = S( b.index - 1 ), b.updateItemHTML();
			}, goTo: function( a ) {
				b.direction = a >= b.index, b.index = a, b.updateItemHTML();
			}, preloadNearbyImages: function() {
				var a,
					c = b.st.gallery.preload,
					d = Math.min( c[0], b.items.length ),
					e = Math.min( c[1], b.items.length );
				for (a = 1; a <= ( b.direction ? e : d ); a++) {
					b._preloadItem( b.index + a );
				}
				for (a = 1; a <= ( b.direction ? d : e ); a++) {
					b._preloadItem( b.index - a );
				}
			}, _preloadItem: function( c ) {
				if (c = S( c ), ! b.items[c].preloaded) {
					var d = b.items[c];
					d.parsed || ( d = b.parseEl( c ) ), y( 'LazyLoad', d ), 'image' === d.type && ( d.img = a( '<img class="mfp-img" />' ).on( 'load.mfploader', function() {
						d.hasSize = ! 0;
					} ).on( 'error.mfploader', function() {
						d.hasSize = ! 0, d.loadError = ! 0, y( 'LazyLoadError', d );
					} ).attr( 'src', d.src ) ), d.preloaded = ! 0;
				}
			}
		}
	} );
	var U = 'retina';
	a.magnificPopup.registerModule( U, {
		options: {
			replaceSrc: function( a ) {
				return a.src.replace( /\.\w+$/, function( a ) {
					return '@2x' + a;
				} );
			}, ratio: 1
		}, proto: {
			initRetina: function() {
				if (window.devicePixelRatio > 1) {
					var a = b.st.retina,
						c = a.ratio;
					c = isNaN( c ) ? c() : c, c > 1 && ( w( 'ImageHasSize.' + U, function( a, b ) {
						b.img.css( {'max-width': b.img[0].naturalWidth / c, width: '100%'} );
					} ), w( 'ElementParse.' + U, function( b, d ) {
						d.src = a.replaceSrc( d, c );
					} ) );
				}
			}
		}
	} ), A();
} );

//end libs
jQuery( function() {

	var result_block_position = jQuery( '.calculator-wrapper .preview-block .image-block' ).offset().top + jQuery( '.calculator-wrapper .preview-block .image-block' ).height();

	// jQuery( window ).resize(function() {
	// 	result_block_position = jQuery(".calculator-wrapper .preview-block .image-block").offset().top + jQuery(".calculator-wrapper .preview-block .image-block").height();
	// });

	// custom select
	jQuery( 'select.custom-select' ).styler();

	// add class has-calculator-page to body
	jQuery( document ).find( 'body' ).addClass( 'has-calculator-page' );

	// show/hide calc block
	jQuery( document ).on( 'change', '.calculator-spoiler-block .on-off-switch-wrapper .on-off-switch input', function( e ) {
		let $content = jQuery( this ).closest( '.calculator-spoiler-block' ).children( '.spoiler-content' );
		let $arrow = jQuery( this ).closest( '.spoiler-header' ).children( '.angle-icon' );

		if (jQuery( this ).is( ':checked' )) {
			$content.slideDown();
			$arrow.show();

		} else {
			$content.slideUp();
			$arrow.hide();
		}
	} );

	//first init colorize house
	jQuery( '.calculator-wrapper .color-choose-block .color-block.selected' ).each( function() {
		let color = jQuery( this ).data( 'color' );
		let surface_class = jQuery( this ).data( 'surface_class' );
		if (surface_class != '') {
			jQuery( '.calculator-wrapper .preview-block .image-block ' + surface_class ).css( {
				fill: color
			} );
		}
	} );


	// choose color
	jQuery( document ).on( 'click', '.calculator-wrapper .color-choose-block .color-block', function( e ) {
		jQuery( this ).closest( '.color-choose-block' ).find( '.color-block.selected' ).removeClass( 'selected' );
		jQuery( this ).addClass( 'selected' );
		let color = jQuery( this ).data( 'color' );
		let surface_class = jQuery( this ).data( 'surface_class' );
		if (surface_class != '') {
			jQuery( '.calculator-wrapper .preview-block .image-block ' + surface_class ).css( {
				fill: color
			} );
		}
	} );

	var isfeet = false;
	var postfix = ' m<sup>2</sup>';
	var postfix2 = 'm2';
	jQuery( document ).on( 'change', '.measure-unit-switch-wrapper input', function( e ) {
		if (jQuery( this ).is( ':checked' )) {
			isfeet = true;
			postfix = ' ft<sup>2</sup>';
			postfix2 = 'm2';
		} else {
			isfeet = false;
			postfix = ' m<sup>2</sup>';
			postfix2 = 'ft2';
		}
	} );


	//choose roof type
	jQuery( document ).on( 'click', '.calculator-wrapper .roof-type-wrapper .roof-type-block', function( e ) {
		jQuery( this ).closest( '.roof-type-wrapper' ).find( '.roof-type-block.selected' ).removeClass( 'selected' );
		jQuery( this ).addClass( 'selected' );
		let type = jQuery( this ).data( 'type' );
		if (type == 'gable') {
			jQuery( '.calculator-wrapper .preview-block .image-block .shed_roof_house' ).addClass( 'myhidden' );
			jQuery( '.roof-slope-2-wrapper' ).hide();
			jQuery( '.roof-slope-2-wrapper' ).closest( '.roof-parameters-wrapper' ).removeClass( 'three-cols two-cols' ).addClass( 'two-cols' );
		} else {
			jQuery( '.calculator-wrapper .preview-block .image-block .shed_roof_house' ).removeClass( 'myhidden' );
			jQuery( '.roof-slope-2-wrapper' ).show();
			jQuery( '.roof-slope-2-wrapper' ).closest( '.roof-parameters-wrapper' ).removeClass( 'two-cols three-cols' ).addClass( 'three-cols' );
		}
	} );


	var getPrice = function( square, thickness, isroof, isfeet ) {
		let price;
		let result;
		switch (thickness) {
		case '40':
			isroof ? price = 560 : price = 54;
			break;
		case '50':
			isroof ? price = 58 : price = 56;
			break;
		case '60':
			isroof ? price = 60 : price = 60;
			break;
		case '80':
			isroof ? price = 64 : price = 62;
			break;
		case '100':
			isroof ? price = 66 : price = 64;
			break;
		case '120':
			isroof ? price = 70 : price = 66;
			break;
		case '150':
			isroof ? price = 72 : price = 68;
			break;
		case '200':
			isroof ? price = 76 : price = 72;
			break;
		default:
			isroof ? price = 54 : price = 52;
		}

		if (isfeet) {
			result = price * square / 10.764;
		} else {
			result = price * square;
		}

		return Number( result.toFixed( 2 ) );

	};


	//automaticaly fill wall length and width at roof block after filling it at wall block
	jQuery( document ).on( 'change', 'input[name=wall_length]', function( e ) {
		jQuery( 'input[name=roof_wall_length]' ).val( jQuery( this ).val() );
	} );

	jQuery( document ).on( 'change', 'input[name=wall_width]', function( e ) {
		jQuery( 'input[name=roof_wall_width]' ).val( jQuery( this ).val() );
	} );


	//calculate
	jQuery( document ).on( 'click', '#calculate-btn', function( e ) {
		e.preventDefault();
		let wall_subtotal = 0;
		let roof_subtotal = 0;
		let ceiling_subtotal = 0;
		let total = 0;

		let calc_params_output = '';


		//walls
		if (jQuery( 'input[name=walls-switch]' ).is( ':checked' )) {

			jQuery( '.calc-result.wall-results' ).show();

			let walls_area = 0;

			jQuery( '.wall-parameters-block' ).each( function() {
				let wall_length = Number( jQuery( this ).find( '.wall_length' ).val() );
				let wall_height = Number( jQuery( this ).find( '.wall_height' ).val() );
				let wall_amount = Number( jQuery( this ).find( '.wall_amount' ).val() );

				walls_area += wall_length * wall_height * wall_amount;

			} );


			let wall_panel_type = jQuery( 'select[name=\'wall_panel_type\'' ).val();
			let wall_panel_thickness = jQuery( 'select[name=\'wall_panel_thickness\'' ).val();
			let wall_color = jQuery( '.wall-calculator-block .color-choose-block' ).find( '.color-block.selected' ).data( 'color-name' );

			jQuery( '#wall_area' ).html( walls_area + postfix );
			jQuery( '#wall_panel_type' ).html( wall_panel_type );
			jQuery( '#wall_panel_thickness' ).html( wall_panel_thickness );
			jQuery( '#wall_color' ).html( wall_color );
			wall_subtotal = getPrice( walls_area, wall_panel_thickness, false, isfeet );
			jQuery( '#wall_subtotal' ).html( wall_subtotal + ' میلیون تومان' );

			//generate html for form
			calc_params_output += '\nWALLS: \n';
			calc_params_output += 'Walls area: ' + walls_area + postfix2 + '\n';
			calc_params_output += 'Walls panel type: ' + wall_panel_type + '\n';
			calc_params_output += 'Walls panel thickness: ' + wall_panel_thickness + '\n';
			calc_params_output += 'Walls color: ' + wall_color + '\n';
			calc_params_output += 'Walls subtotal: میلیون تومان ' + wall_subtotal + '\n\n';

		} else {
			// hide results block
			jQuery( '.calc-result.wall-results' ).hide();
		}

		//roof
		if (jQuery( 'input[name=roof-switch]' ).is( ':checked' )) {

			jQuery( '.calc-result.roof-results' ).show();

			let roof_width = Number( jQuery( 'input[name=\'roof_wall_length\'' ).val() );
			let roof_slope_length1 = Number( jQuery( 'input[name=\'roof_slope1_length\'' ).val() );
			let roof_slope_length2 = Number( jQuery( 'input[name=\'roof_slope2_length\'' ).val() );
			let roof_panel_type = jQuery( 'select[name=\'roof_panel_type\'' ).val();
			let roof_panel_thickness = jQuery( 'select[name=\'roof_panel_thickness\'' ).val();

			let roof_color = jQuery( '.roof-calculator-block .color-choose-block' ).find( '.color-block.selected' ).data( 'color-name' );
			let roof_area;

			let roof_type = jQuery( '.roof-type-wrapper .roof-type-block.selected' ).data( 'type' );
			if (roof_type == 'shed') {
				roof_area = roof_width * ( roof_slope_length1 + roof_slope_length2 );
			} else {
				roof_area = roof_width * roof_slope_length1;
			}

			jQuery( '#roof_area' ).html( roof_area + postfix );
			jQuery( '#roof_panel_type' ).html( roof_panel_type );
			jQuery( '#roof_panel_thickness' ).html( roof_panel_thickness );
			jQuery( '#roof_color' ).html( roof_color );

			roof_subtotal = getPrice( roof_area, roof_panel_thickness, true, isfeet );
			jQuery( '#roof_subtotal' ).html( roof_subtotal + ' میلیون تومان' );

			//generate html for form
			calc_params_output += '\nROOF:\n';
			calc_params_output += 'Roof area: ' + roof_area + postfix2 + '\n';
			calc_params_output += 'Roof panel type: ' + roof_panel_type + '\n';
			calc_params_output += 'Roof panel thickness: ' + roof_panel_thickness + '\n';
			calc_params_output += 'Roof color: ' + roof_color + '\n';
			calc_params_output += 'Roof subtotal: میلیون تومان ' + roof_subtotal + '\n\n';

		} else {
			// hide results block
			jQuery( '.calc-result.roof-results' ).hide();
		}

		//ceiling
		if (jQuery( 'input[name="ceiling-switch"]' ).is( ':checked' )) {

			jQuery( '.calc-result.ceiling-results' ).show();

			let ceiling_length = Number( jQuery( 'input[name=\'ceiling_length\'' ).val() );
			let ceiling_width = Number( jQuery( 'input[name=\'ceiling_width\'' ).val() );
			let ceiling_panel_type = jQuery( 'select[name=\'ceiling_panel_type\'' ).val();
			let ceiling_panel_thickness = jQuery( 'select[name=\'ceiling_panel_thickness\'' ).val();


			let ceiling_color = jQuery( '.ceiling-calculator-block .color-choose-block' ).find( '.color-block.selected' ).data( 'color-name' );
			let ceiling_area = ceiling_length * ceiling_width;

			jQuery( '#ceiling_area' ).html( ceiling_area + postfix );
			jQuery( '#ceiling_panel_type' ).html( ceiling_panel_type );
			jQuery( '#ceiling_panel_thickness' ).html( ceiling_panel_thickness );
			jQuery( '#ceiling_color' ).html( ceiling_color );
			ceiling_subtotal = getPrice( ceiling_area, ceiling_panel_thickness, false, isfeet );
			jQuery( '#ceiling_subtotal' ).html( ceiling_subtotal + ' میلیون تومان' );

			//generate html for form
			calc_params_output += '\nCEILING:\n';
			calc_params_output += 'Ceiling area: ' + ceiling_area + postfix2 + '\n';
			calc_params_output += 'Ceiling panel type: ' + ceiling_panel_type + '\n';
			calc_params_output += 'Ceiling panel thickness: ' + ceiling_panel_thickness + '\n';
			calc_params_output += 'Ceiling color: ' + ceiling_color + '\n';
			calc_params_output += 'Ceiling subtotal: میلیون تومان ' + ceiling_subtotal + '\n';

		} else {
			// hide results block
			jQuery( '.calc-result.ceiling-results' ).hide();
		}


		total = wall_subtotal + roof_subtotal + ceiling_subtotal;

		jQuery( '#total_cost' ).html( total + ' میلیون تومان' );

		//put calc results output to form
		calc_params_output += '\n TOTAL COST: میلیون تومان ' + total + '\n';
		jQuery( 'input[name=calculator-parameters-output]' ).val( calc_params_output );

		jQuery( '#calculation-results-block' ).show();
		jQuery( 'html, body' ).animate( {
			scrollTop: result_block_position
		}, 1000 );
	} );

	//reset btn
	jQuery( document ).on( 'click', '#reset-form-btn', function( e ) {
		jQuery( '.calculator-wrapper .preview-block .calculation-results-block' ).hide();
	} );

	// popup
	jQuery( '.leave-request-btn' ).magnificPopup( {
		type: 'inline',
		preloader: false,
		focus: '#leave_request_form_name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if (jQuery( window ).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#leave_request_form_name';
				}

				//get correct image
				let classname;
				let roof_type = jQuery( '.roof-type-wrapper .roof-type-block.selected' ).data( 'type' );
				if (roof_type == 'shed') {
					classname = '.shed_roof_house';
				} else {
					classname = '.gable_roof_house';
				}
				let selector = '.calculator-wrapper .preview-block .image-block ' + classname;

				//add preview image inside popup
				jQuery( '#leave-request-form .preview-image-wrapper' ).html( jQuery( selector ).clone() );
			}
		}
	} );


	//add wall
	jQuery( document ).on( 'click', '.calculator-wrapper .add-wall-btn', function( e ) {
		e.preventDefault();
		let count = Date.now();
		let sel1 = '';
		let sel2 = '';
		let wrapper1 = '';
		let wrapper2 = '';
		let header = '<div class="header"><label>دیوارهای دیگر</label><div class="delete-block-btn" title="delete walls"><svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.53 5.97a.75.75 0 0 0-1.06 1.06l5.47 5.47-5.47 5.47a.75.75 0 1 0 1.06 1.06L12 13.56l5.47 5.47a.75.75 0 1 0 1.06-1.06l-5.47-5.47 5.47-5.47a.75.75 0 0 0-1.06-1.06L12 11.44 6.53 5.97Z" /></svg></div></div>';

		//inputs width,height,amount
		wrapper1 += '<div class="wall-parameters-block">' + header + '<div class="three-cols mb10">';
		wrapper1 += '<label class="input-wrapper colmn">عرض:<input type="number" name="wall_length' + count + '" class="wall_length" required></label>';
		wrapper1 += '<label class="input-wrapper colmn">ارتفاع:<input type="number" name="wall_height' + count + '" class="wall_height" required></label>';
		wrapper1 += '<label class="input-wrapper colmn">تعداد دیوارها:<input type="number" name="wall_amount' + count + '" class="wall_amount" value="1" required step="1" min="1"></label></div>';
		wrapper2 += '</div>';

		jQuery( this ).before( wrapper1 + wrapper2 );
		jQuery( "select.custom-select" ).styler();

	} );

	//remove wall
	jQuery( document ).on( 'click', '.calculator-wrapper .wall-parameters-block .delete-block-btn', function( e ) {
		jQuery( this ).closest( '.wall-parameters-block' ).remove();
	} );
} );
