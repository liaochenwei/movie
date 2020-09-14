package util;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * @Author Miss kun
 * @Date 2020/9/10 11:36
 * @Version 1.0
 * 通过连接池获取连接
 */
public class DBUtil{
    private static DataSource dataSource = new ComboPooledDataSource();//采用c3p0的连接池

    public static Connection getConnection(){
        try {
            return dataSource.getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    //返回DataSource
    public  static DataSource getDataSource(){
        return dataSource;
    }

}