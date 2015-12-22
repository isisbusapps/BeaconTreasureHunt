var $table = $('#table'),
    $remove = $('#remove'),
    $insertRow = $('#insertRow'),
    selections = [];

        function initTable() {
            $table.bootstrapTable({
                height: getHeight(),
                columns: [
                    [
                        {
                            field: 'state',
                            checkbox: true,
                            rowspan: 2,
                            align: 'center',
                            valign: 'middle'
                        }, {
                            title: 'Beacon ID',
                            field: 'id',
                            rowspan: 2,
                            align: 'center',
                            valign: 'middle',
                            editable: true,
                            sortable: true,
                        }, {
                            title: 'Beacon Detail',
                            colspan: 5,
                            align: 'center'
                        }
                    ],
                    [
                        {
                            field: 'riddle',
                            title: 'Riddle',
                            sortable: true,
                            editable: true,
                            align: 'center'
                        }, {
                            field: 'answer',
                            title: 'Answer',
                            sortable: true,
                            align: 'center',
                            editable: {
                                type: 'text',
                                title: 'Item Price',
                                validate: function (value) {
                                    value = $.trim(value);
                                    if (!value) {
                                        return 'This field is required';
                                    }
                                    if (!/^$/.test(value)) {
                                        return 'This field needs to start width $.'
                                    }
                                    var data = $table.bootstrapTable('getData'),
                                        index = $(this).parents('tr').data('index');
                                    //console.log(data[index]);
                                    return '';
                                }
                            },
                        }, {
                            field: 'clue',
                            title: 'Clue',
                            sortable: true,
                            editable: true,
                            align: 'center'
                        }, {
                            field: 'url',
                            title: 'URL',
                            sortable: true,
                            editable: true,
                            align: 'center'
                        }, {
                            field: 'actions',
                            title: 'Actions',
                            align: 'center',
                            events: operateEvents,
                            formatter: operateFormatter
                        }
                    ]
                ]//, data: randomData()
            });

            // sometimes footer render error.
            setTimeout(function () {
                $table.bootstrapTable('resetView');
            }, 200);

            $table.on('check.bs.table uncheck.bs.table ' +
                    'check-all.bs.table uncheck-all.bs.table', function () {
                        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
                        // save your data, here just save the current page
                        selections = getIdSelections();
                        // push or splice the selections if you want to save all data selections
                    });

            $table.on('expand-row.bs.table', function (e, index, row, $detail) {
                if (index % 2 == 1) {
                    $detail.html('Loading from ajax request...');
                    $.get('LICENSE', function (res) {
                        $detail.html(res.replace(/\n/g, '<br>'));
                    });
                }
            });

            $remove.click(function () {
                var ids = getIdSelections();
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                $remove.prop('disabled', true);
            });

            $(window).resize(function () {
                $table.bootstrapTable('resetView', {
                    height: getHeight()
                });
            });



            loadData();
            saveData();
        }

        function getIdSelections() {
            return $.map($table.bootstrapTable('getSelections'), function (row) {
                return row.id
            });
        }

        function responseHandler(res) {
            $.each(res.rows, function (i, row) {
                row.state = $.inArray(row.id, selections) !== -1;
            });
            return res;
        }

        function operateFormatter(value, row, index) {
            return [
                '<a class="save" href="javascript:void(0)" title="Save">',
                '<i class="glyphicon glyphicon-floppy-disk"></i>',
                '</a>  ',
                '<a class="remove" href="javascript:void(0)" title="Remove">',
                '<i class="glyphicon glyphicon-remove"></i>',
                '</a>'
            ].join('');
        }

        window.operateEvents = {
            'click .save': function (e, value, row, index) {
                alert('You click save action, row: ' + JSON.stringify(row));
            },
            'click .remove': function (e, value, row, index) {
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: [row.id]
                });
            }
        };

        function getHeight() {
            return $(window).height() - $('h1').outerHeight(true);
        }

        $(function () {
            var scripts = [
                    location.search.substring(1) || 'vendor/bootstrap-table/bootstrap-table.js',
                    'vendor/bootstrap-table/extensions/export/bootstrap-table-export.js',
                    'js/tableExport.js',
                    'vendor/bootstrap-table/extensions/editable/bootstrap-table-editable.js',
                    'js/bootstrap-editable.js'
            ],
                eachSeries = function (arr, iterator, callback) {
                    callback = callback || function () { };
                    if (!arr.length) {
                        return callback();
                    }
                    var completed = 0;
                    var iterate = function () {
                        iterator(arr[completed], function (err) {
                            if (err) {
                                callback(err);
                                callback = function () { };
                            }
                            else {
                                completed += 1;
                                if (completed >= arr.length) {
                                    callback(null);
                                }
                                else {
                                    iterate();
                                }
                            }
                        });
                    };
                    iterate();
                };
            eachSeries(scripts, getScript, initTable);
        });

        function getScript(url, callback) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = url;
            var done = false;
            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState ||
                        this.readyState == 'loaded' || this.readyState == 'complete')) {
                    done = true;
                    if (callback)
                        callback();
                    // Handle memory leak in IE
                    script.onload = script.onreadystatechange = null;
                }
            };
            head.appendChild(script);
            // We handle everything using the script element injection
            return undefined;
        }

        function getMaxID() {
            var data = $table.bootstrapTable('getData');
            var maxID = 0;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                for (var key in obj) {
                    if (key === 'id')
                    {
                        if (maxID < obj[key])
                        {
                            maxID = obj[key];
                        }
                    }
                }
            }
            return maxID;
        }

        $(function () {
            $insertRow.click(function () {
                $table.bootstrapTable('insertRow', {
                    index: getMaxID() + 1,
                    row: {
                        id: getMaxID() + 1,
                        riddle: '',
                        answer: '',
                        clue: '',
                        url: ''
                    }
                });
            });
        });

        function saveData() {
            var data = $table.bootstrapTable('getData');
            console.log(data);
        }

        //function randomData() {
        //    var rows = [];
        //    for (var i = 0; i < 10; i++) {
        //        rows.push({
        //            id: 1 + i,
        //            riddle: 'test riddle ' + (1 + i),
        //            answer: 'test answer ' + (1 + i),
        //            clue: 'test clue ' + (1 + i),
        //            url: 'www.stfc.ac.uk'
        //        });
        //    }
        //    return rows;
        //}

        function loadData() {
            $.getJSON("test.json", function (json) {
                var objects = { total: json.length, rows: json };
                $table.bootstrapTable('load', objects);
            });
        }

        function insertIntoTable(row) {
            $table.bootstrapTable('insertRow', {
                index: getMaxID() + 1,
                row: row
            });
        }