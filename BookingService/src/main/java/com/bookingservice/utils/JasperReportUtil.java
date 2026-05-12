package com.bookingservice.utils;

import com.bookingservice.payload.dto.BookingReportDto;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.io.InputStream;
import java.util.*;

public class JasperReportUtil {
    public byte[] generateBookingReport(BookingReportDto bookingReportDto){
        try{
            InputStream reportStream =
                    this.getClass().getResourceAsStream("/reports/salon_report.jrxml");
            if (reportStream == null) {
                throw new RuntimeException("JRXML file not found in resources/reports/");
            }

            JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

            JRBeanCollectionDataSource mainDS = new JRBeanCollectionDataSource(Collections.singletonList(bookingReportDto));
            JRBeanCollectionDataSource serviceDS = new JRBeanCollectionDataSource(bookingReportDto.getServiceDtoList());

            Map<String, Object> params = new HashMap<>();
            params.put("SERVICE_DS", serviceDS);

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, mainDS);
            return JasperExportManager.exportReportToPdf(jasperPrint);
        }
        catch (Exception e) {
            throw new RuntimeException("Booking Details generation failed: " + e.getMessage(), e);
        }
    }
}
