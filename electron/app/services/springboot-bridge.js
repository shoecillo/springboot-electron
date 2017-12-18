/**
 * 
 */

app.factory('bridge', function($q,$http) 
{
	
	
	
	return {
		
		callPost : function(serv,data,config){
			
			const url = "http://localhost:8080"+serv;
			
			return $http.post(url, data, config).then(function(resp){
				return resp;
			},function(err){
				return $q.defered(err);
			});
			
		},
		callGet : function(serv,config){
			
			const url = "http://localhost:8080"+serv;
			
			return $http.get(url).then(function(resp){
				return resp;
			},function(err){
				return $q.defered(err);
			});
		}
	};
	
});